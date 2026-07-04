import { create } from 'zustand';

import { canvasObjectRepository } from '@/features/canvas/services/canvasObjectRepository';
import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';
import { STICKY_NOTE_COLORS } from '@/features/canvas/types/canvas.types';

interface CanvasObjectsState {
  workspaceId: string | null;
  objects: CanvasObjectNode[];
  load: (workspaceId: string, userId: string) => void;
  addStickyNote: (x: number, y: number, userId: string) => CanvasObjectNode;
  moveObject: (id: string, x: number, y: number) => void;
  updateObject: (id: string, patch: Partial<CanvasObjectNode>) => void;
  bringToFront: (id: string) => void;
}

function persist(state: CanvasObjectsState): void {
  if (!state.workspaceId) return;
  canvasObjectRepository.write(state.workspaceId, state.objects);
}

export const useCanvasObjectsStore = create<CanvasObjectsState>((set, get) => ({
  workspaceId: null,
  objects: [],

  load: (workspaceId, userId) => {
    const objects = canvasObjectRepository.read(workspaceId, userId);
    set({ workspaceId, objects });
  },

  addStickyNote: (x, y, userId) => {
    const { workspaceId, objects } = get();
    if (!workspaceId) throw new Error('Canvas not loaded');

    const maxZ = objects.reduce((max, obj) => Math.max(max, obj.zIndex), 0);
    const note: CanvasObjectNode = {
      id: crypto.randomUUID(),
      workspaceId,
      type: 'sticky_note',
      x: x - 100,
      y: y - 80,
      width: 200,
      height: 160,
      rotation: 0,
      zIndex: maxZ + 1,
      content: '',
      color: STICKY_NOTE_COLORS[objects.length % STICKY_NOTE_COLORS.length],
      createdBy: userId,
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      const next = { ...state, objects: [...state.objects, note] };
      persist(next);
      return next;
    });

    return note;
  },

  moveObject: (id, x, y) =>
    set((state) => {
      const nextObjects = state.objects.map((obj) =>
        obj.id === id
          ? { ...obj, x, y, updatedAt: new Date().toISOString() }
          : obj,
      );
      const next = { ...state, objects: nextObjects };
      persist(next);
      return next;
    }),

  updateObject: (id, patch) =>
    set((state) => {
      const nextObjects = state.objects.map((obj) =>
        obj.id === id
          ? { ...obj, ...patch, updatedAt: new Date().toISOString() }
          : obj,
      );
      const next = { ...state, objects: nextObjects };
      persist(next);
      return next;
    }),

  bringToFront: (id) =>
    set((state) => {
      const maxZ = state.objects.reduce(
        (max, obj) => Math.max(max, obj.zIndex),
        0,
      );
      const nextObjects = state.objects.map((obj) =>
        obj.id === id ? { ...obj, zIndex: maxZ + 1 } : obj,
      );
      const next = { ...state, objects: nextObjects };
      persist(next);
      return next;
    }),
}));
