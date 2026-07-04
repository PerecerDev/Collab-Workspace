import { useEffect } from 'react';

import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import { canvasSyncEngine } from '@/sync/canvasSyncEngine';
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

interface UseCanvasSyncOptions {
  workspaceId: string | undefined;
  userId: string | undefined;
  enabled?: boolean;
}

export function useCanvasSync({
  workspaceId,
  userId,
  enabled = true,
}: UseCanvasSyncOptions) {
  useEffect(() => {
    if (!enabled || !workspaceId || !userId) return;

    const client = getRealtimeClient();
    useSyncStore.getState().setSyncing(true);

    const unsubs = [
      client.on<CreatedPayload>(
        OBJECT_EVENT_TYPES.created,
        (payload, event) => {
          if (event.workspaceId !== workspaceId) return;
          if (
            event.actorId === userId &&
            event.sessionId === client.getSessionId()
          ) {
            return;
          }
          canvasSyncEngine.handleRemoteCreated(payload, userId);
        },
      ),

      client.on<UpdatedPayload>(
        OBJECT_EVENT_TYPES.updated,
        (payload, event) => {
          if (event.workspaceId !== workspaceId) return;
          if (
            event.actorId === userId &&
            event.sessionId === client.getSessionId()
          ) {
            return;
          }
          canvasSyncEngine.handleRemoteUpdated(payload, userId);
        },
      ),

      client.on<DeletedPayload>(
        OBJECT_EVENT_TYPES.deleted,
        (payload, event) => {
          if (event.workspaceId !== workspaceId) return;
          if (
            event.actorId === userId &&
            event.sessionId === client.getSessionId()
          ) {
            return;
          }
          canvasSyncEngine.handleRemoteDeleted(payload);
        },
      ),

      client.on<SyncPayload>(OBJECT_EVENT_TYPES.sync, (payload, event) => {
        if (event.workspaceId !== workspaceId) return;
        if (event.sessionId === client.getSessionId()) return;
        canvasSyncEngine.handleRemoteSnapshot(payload);
      }),
    ];

    const syncTimer = window.setTimeout(() => {
      canvasSyncEngine.broadcastSnapshot(workspaceId, userId);
    }, 400);

    return () => {
      window.clearTimeout(syncTimer);
      unsubs.forEach((unsub) => unsub());
      useSyncStore.getState().setSyncing(false);
    };
  }, [enabled, userId, workspaceId]);
}
