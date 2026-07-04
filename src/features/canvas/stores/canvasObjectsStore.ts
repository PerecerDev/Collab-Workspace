import { create } from 'zustand';

import { createBlockNode } from '@/features/blocks/registry/createBlockNode';
import type { BlockPlacementTool } from '@/features/blocks/types/block.types';
import { canvasObjectRepository } from '@/features/canvas/services/canvasObjectRepository';
import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';
import { shouldApplyRemoteUpdate } from '@/sync/conflictResolver';

interface CanvasObjectsState {
  workspaceId: string | null;
  objects: CanvasObjectNode[];
  load: (workspaceId: string, userId: string) => void;
  getObject: (id: string) => CanvasObjectNode | undefined;
  applyLocalObject: (object: CanvasObjectNode) => void;
  applyLocalPatch: (
    id: string,
    patch: Partial<CanvasObjectNode>,
    actorId: string,
  ) => CanvasObjectNode | null;
  applyRemoteObject: (object: CanvasObjectNode) => boolean;
  applyRemotePatch: (
    objectId: string,
    patch: Partial<CanvasObjectNode> & {
      updatedAt: string;
      updatedBy: string;
    },
  ) => boolean;
  applyRemoteDelete: (
    objectId: string,
    updatedAt: string,
    updatedBy: string,
  ) => boolean;
  mergeRemoteSnapshot: (objects: CanvasObjectNode[]) => void;
  removeObjectLocal: (id: string) => void;
  createBlockLocal: (
    tool: BlockPlacementTool,
    x: number,
    y: number,
    userId: string,
  ) => CanvasObjectNode;
}

function normalizeObject(object: CanvasObjectNode): CanvasObjectNode {
  return {
    ...object,
    updatedBy: object.updatedBy ?? object.createdBy,
  };
}

function persist(state: CanvasObjectsState): void {
  if (!state.workspaceId) return;
  canvasObjectRepository.write(state.workspaceId, state.objects);
}

export const useCanvasObjectsStore = create<CanvasObjectsState>((set, get) => ({
  workspaceId: null,
  objects: [],

  load: (workspaceId, userId) => {
    const objects = canvasObjectRepository
      .read(workspaceId, userId)
      .map(normalizeObject);
    set({ workspaceId, objects });
  },

  getObject: (id) => get().objects.find((obj) => obj.id === id),

  applyLocalObject: (object) =>
    set((state) => {
      const normalized = normalizeObject(object);
      const next = {
        ...state,
        objects: [
          ...state.objects.filter((o) => o.id !== normalized.id),
          normalized,
        ],
      };
      persist(next);
      return next;
    }),

  applyLocalPatch: (id, patch, actorId) => {
    let updated: CanvasObjectNode | null = null;

    set((state) => {
      const nextObjects = state.objects.map((obj) => {
        if (obj.id !== id) return obj;

        updated = normalizeObject({
          ...obj,
          ...patch,
          updatedBy: actorId,
          updatedAt: patch.updatedAt ?? new Date().toISOString(),
        });
        return updated;
      });

      const next = { ...state, objects: nextObjects };
      persist(next);
      return next;
    });

    return updated;
  },

  applyRemoteObject: (object) => {
    const normalized = normalizeObject(object);
    const existing = get().getObject(normalized.id);

    if (
      existing &&
      !shouldApplyRemoteUpdate(
        existing.updatedAt,
        existing.updatedBy,
        normalized.updatedAt,
        normalized.updatedBy,
      )
    ) {
      return false;
    }

    get().applyLocalObject(normalized);
    return true;
  },

  applyRemotePatch: (objectId, patch) => {
    const existing = get().getObject(objectId);
    if (!existing) return false;

    if (
      !shouldApplyRemoteUpdate(
        existing.updatedAt,
        existing.updatedBy,
        patch.updatedAt,
        patch.updatedBy,
      )
    ) {
      return false;
    }

    get().applyLocalPatch(objectId, patch, patch.updatedBy);
    return true;
  },

  applyRemoteDelete: (objectId, updatedAt, updatedBy) => {
    const existing = get().getObject(objectId);
    if (!existing) return false;

    if (
      !shouldApplyRemoteUpdate(
        existing.updatedAt,
        existing.updatedBy,
        updatedAt,
        updatedBy,
      )
    ) {
      return false;
    }

    set((state) => {
      const next = {
        ...state,
        objects: state.objects.filter((obj) => obj.id !== objectId),
      };
      persist(next);
      return next;
    });

    return true;
  },

  mergeRemoteSnapshot: (objects) =>
    set((state) => {
      const merged = new Map(state.objects.map((obj) => [obj.id, obj]));

      objects.map(normalizeObject).forEach((remote) => {
        const local = merged.get(remote.id);
        if (
          !local ||
          shouldApplyRemoteUpdate(
            local.updatedAt,
            local.updatedBy,
            remote.updatedAt,
            remote.updatedBy,
          )
        ) {
          merged.set(remote.id, remote);
        }
      });

      const next = { ...state, objects: Array.from(merged.values()) };
      persist(next);
      return next;
    }),

  removeObjectLocal: (id) =>
    set((state) => {
      const next = {
        ...state,
        objects: state.objects.filter((obj) => obj.id !== id),
      };
      persist(next);
      return next;
    }),

  createBlockLocal: (tool, x, y, userId) => {
    const { workspaceId, objects } = get();
    if (!workspaceId) throw new Error('Canvas not loaded');

    const maxZ = objects.reduce((max, obj) => Math.max(max, obj.zIndex), 0);
    const block = createBlockNode({
      workspaceId,
      userId,
      x,
      y,
      zIndex: maxZ + 1,
      tool,
    });

    get().applyLocalObject(block);
    return block;
  },
}));

// Legacy aliases for gradual migration
export const useCanvasObjectsActions = () => {
  const store = useCanvasObjectsStore();
  return {
    load: store.load,
    objects: store.objects,
    moveObject: (id: string, x: number, y: number, actorId: string) =>
      store.applyLocalPatch(id, { x, y }, actorId),
    updateObject: (
      id: string,
      patch: Partial<CanvasObjectNode>,
      actorId: string,
    ) => store.applyLocalPatch(id, patch, actorId),
  };
};
