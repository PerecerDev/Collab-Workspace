import { create } from 'zustand';

import type {
  OptimisticOperation,
  SyncConflict,
} from '@/sync/types/sync.types';

interface SyncState {
  pendingOperations: OptimisticOperation[];
  conflicts: SyncConflict[];
  isSyncing: boolean;
  addPending: (operation: OptimisticOperation) => void;
  confirmPending: (objectId: string) => void;
  failPending: (objectId: string) => void;
  addConflict: (conflict: SyncConflict) => void;
  dismissConflict: (objectId: string) => void;
  clearConflicts: () => void;
  setSyncing: (isSyncing: boolean) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  pendingOperations: [],
  conflicts: [],
  isSyncing: false,

  addPending: (operation) =>
    set((state) => ({
      pendingOperations: [...state.pendingOperations, operation],
    })),

  confirmPending: (objectId) =>
    set((state) => ({
      pendingOperations: state.pendingOperations.filter(
        (op) => op.objectId !== objectId,
      ),
    })),

  failPending: (objectId) =>
    set((state) => ({
      pendingOperations: state.pendingOperations.map((op) =>
        op.objectId === objectId ? { ...op, status: 'failed' as const } : op,
      ),
    })),

  addConflict: (conflict) =>
    set((state) => ({
      conflicts: [
        conflict,
        ...state.conflicts.filter((c) => c.objectId !== conflict.objectId),
      ].slice(0, 5),
    })),

  dismissConflict: (objectId) =>
    set((state) => ({
      conflicts: state.conflicts.filter((c) => c.objectId !== objectId),
    })),

  clearConflicts: () => set({ conflicts: [] }),

  setSyncing: (isSyncing) => set({ isSyncing }),
}));
