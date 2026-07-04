import type { BlockPlacementTool } from '@/features/blocks/types/block.types';
import { useCanvasObjectsStore } from '@/features/canvas/stores/canvasObjectsStore';
import { useCanvasSelectionStore } from '@/features/canvas/stores/canvasStores';
import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';
import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import { shouldApplyRemoteUpdate } from '@/sync/conflictResolver';
import {
  OBJECT_EVENT_TYPES,
  type objectCreatedPayloadSchema,
  type objectDeletedPayloadSchema,
  type objectUpdatedPayloadSchema,
  type objectsSyncPayloadSchema,
} from '@/realtime/events/objectEventSchemas';
import { useSyncStore } from '@/sync/stores/syncStore';
import type { z } from 'zod';

type CreatedPayload = z.infer<typeof objectCreatedPayloadSchema>;
type UpdatedPayload = z.infer<typeof objectUpdatedPayloadSchema>;
type DeletedPayload = z.infer<typeof objectDeletedPayloadSchema>;
type SyncPayload = z.infer<typeof objectsSyncPayloadSchema>;

function emitObjectEvent<T>(
  workspaceId: string,
  actorId: string,
  type: string,
  payload: T,
): void {
  const client = getRealtimeClient();
  if (client.getConnectionStatus() !== 'connected') return;

  client.emit({
    type,
    workspaceId,
    actorId,
    sessionId: client.getSessionId(),
    payload,
  });
}

export const canvasSyncEngine = {
  createBlock(
    tool: BlockPlacementTool,
    x: number,
    y: number,
    userId: string,
  ): CanvasObjectNode {
    const block = useCanvasObjectsStore
      .getState()
      .createBlockLocal(tool, x, y, userId);

    useSyncStore.getState().addPending({
      id: crypto.randomUUID(),
      type: 'create',
      objectId: block.id,
      workspaceId: block.workspaceId,
      snapshot: block,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    emitObjectEvent(block.workspaceId, userId, OBJECT_EVENT_TYPES.created, {
      object: block,
    } satisfies CreatedPayload);

    useSyncStore.getState().confirmPending(block.id);
    return block;
  },

  createStickyNote(x: number, y: number, userId: string): CanvasObjectNode {
    return canvasSyncEngine.createBlock('sticky', x, y, userId);
  },

  moveObject(
    id: string,
    x: number,
    y: number,
    actorId: string,
  ): CanvasObjectNode | null {
    const updatedAt = new Date().toISOString();
    const updated = useCanvasObjectsStore
      .getState()
      .applyLocalPatch(id, { x, y, updatedAt }, actorId);

    if (!updated) return null;

    const workspaceId = useCanvasObjectsStore.getState().workspaceId;
    if (!workspaceId) return updated;

    emitObjectEvent(workspaceId, actorId, OBJECT_EVENT_TYPES.updated, {
      objectId: id,
      patch: { x, y, updatedAt, updatedBy: actorId },
    } satisfies UpdatedPayload);

    return updated;
  },

  resizeObject(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    actorId: string,
  ): CanvasObjectNode | null {
    const updatedAt = new Date().toISOString();
    const updated = useCanvasObjectsStore
      .getState()
      .applyLocalPatch(id, { x, y, width, height, updatedAt }, actorId);

    if (!updated) return null;

    const workspaceId = useCanvasObjectsStore.getState().workspaceId;
    if (!workspaceId) return updated;

    emitObjectEvent(workspaceId, actorId, OBJECT_EVENT_TYPES.updated, {
      objectId: id,
      patch: { x, y, width, height, updatedAt, updatedBy: actorId },
    } satisfies UpdatedPayload);

    return updated;
  },

  updateObjectColor(
    id: string,
    color: string,
    actorId: string,
  ): CanvasObjectNode | null {
    const updatedAt = new Date().toISOString();
    const updated = useCanvasObjectsStore
      .getState()
      .applyLocalPatch(id, { color, updatedAt }, actorId);

    if (!updated) return null;

    const workspaceId = useCanvasObjectsStore.getState().workspaceId;
    if (!workspaceId) return updated;

    emitObjectEvent(workspaceId, actorId, OBJECT_EVENT_TYPES.updated, {
      objectId: id,
      patch: { color, updatedAt, updatedBy: actorId },
    } satisfies UpdatedPayload);

    return updated;
  },

  deleteObject(id: string, actorId: string): void {
    const existing = useCanvasObjectsStore.getState().getObject(id);
    if (!existing) return;

    const updatedAt = new Date().toISOString();
    useCanvasObjectsStore.getState().removeObjectLocal(id);
    useCanvasSelectionStore.getState().clear();

    const workspaceId = useCanvasObjectsStore.getState().workspaceId;
    if (!workspaceId) return;

    emitObjectEvent(workspaceId, actorId, OBJECT_EVENT_TYPES.deleted, {
      objectId: id,
      updatedAt,
      updatedBy: actorId,
    } satisfies DeletedPayload);
  },

  updateObjectContent(
    id: string,
    content: string,
    actorId: string,
  ): CanvasObjectNode | null {
    const updatedAt = new Date().toISOString();
    const updated = useCanvasObjectsStore
      .getState()
      .applyLocalPatch(id, { content, updatedAt }, actorId);

    if (!updated) return null;

    const workspaceId = useCanvasObjectsStore.getState().workspaceId;
    if (!workspaceId) return updated;

    emitObjectEvent(workspaceId, actorId, OBJECT_EVENT_TYPES.updated, {
      objectId: id,
      patch: { content, updatedAt, updatedBy: actorId },
    } satisfies UpdatedPayload);

    return updated;
  },

  broadcastSnapshot(workspaceId: string, actorId: string): void {
    const objects = useCanvasObjectsStore.getState().objects;
    emitObjectEvent(workspaceId, actorId, OBJECT_EVENT_TYPES.sync, {
      objects,
    } satisfies SyncPayload);
  },

  handleRemoteCreated(payload: CreatedPayload, actorId: string): void {
    const applied = useCanvasObjectsStore
      .getState()
      .applyRemoteObject(payload.object);

    if (!applied && payload.object.updatedBy !== actorId) {
      useSyncStore.getState().addConflict({
        objectId: payload.object.id,
        message: 'A collaborator updated this object. Your view was refreshed.',
        resolvedAt: new Date().toISOString(),
      });
    }
  },

  handleRemoteUpdated(payload: UpdatedPayload, actorId: string): void {
    const applied = useCanvasObjectsStore
      .getState()
      .applyRemotePatch(payload.objectId, payload.patch);

    if (!applied && payload.patch.updatedBy !== actorId) {
      const local = useCanvasObjectsStore
        .getState()
        .getObject(payload.objectId);
      if (
        local &&
        !shouldApplyRemoteUpdate(
          local.updatedAt,
          local.updatedBy,
          payload.patch.updatedAt,
          payload.patch.updatedBy,
        )
      ) {
        useSyncStore.getState().addConflict({
          objectId: payload.objectId,
          message:
            'Edit conflict resolved using the latest change from a collaborator.',
          resolvedAt: new Date().toISOString(),
        });
      }
    }
  },

  handleRemoteDeleted(payload: DeletedPayload): void {
    useCanvasObjectsStore
      .getState()
      .applyRemoteDelete(
        payload.objectId,
        payload.updatedAt,
        payload.updatedBy,
      );
  },

  handleRemoteSnapshot(payload: SyncPayload): void {
    useCanvasObjectsStore.getState().mergeRemoteSnapshot(payload.objects);
  },
};
