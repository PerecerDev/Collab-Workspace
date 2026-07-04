export { canvasSyncEngine } from './canvasSyncEngine';
export { ConflictBanner, SyncStatusBadge } from './components/ConflictBanner';
export {
  resolveByTimestamp,
  shouldApplyRemoteUpdate,
} from './conflictResolver';
export { useCanvasSync } from './hooks/useCanvasSync';
export {
  useRemoteSelections,
  useSelectionSync,
} from './hooks/useSelectionSync';
export { useSyncStore } from './stores/syncStore';
