import { Button } from '@/shared/components/ui/Button';
import { cn } from '@/shared/lib/cn';

import { useSyncStore } from '@/sync/stores/syncStore';

export function ConflictBanner({ className }: { className?: string }) {
  const conflicts = useSyncStore((state) => state.conflicts);
  const dismissConflict = useSyncStore((state) => state.dismissConflict);

  if (conflicts.length === 0) return null;

  const latest = conflicts[0];

  return (
    <div
      className={cn(
        'border-warning/30 bg-warning/10 absolute top-4 left-4 z-30 max-w-md rounded-lg border px-4 py-3 shadow-md',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <p className="text-text-primary text-sm font-medium">
        Sync update applied
      </p>
      <p className="text-text-muted mt-1 text-sm">{latest.message}</p>
      <Button
        size="sm"
        variant="ghost"
        className="mt-2"
        onClick={() => dismissConflict(latest.objectId)}
      >
        Dismiss
      </Button>
    </div>
  );
}

export function SyncStatusBadge({ className }: { className?: string }) {
  const isSyncing = useSyncStore((state) => state.isSyncing);
  const pendingCount = useSyncStore(
    (state) =>
      state.pendingOperations.filter((op) => op.status === 'pending').length,
  );

  if (!isSyncing && pendingCount === 0) return null;

  return (
    <span
      className={cn(
        'bg-accent-muted text-accent inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        className,
      )}
    >
      {pendingCount > 0 ? `Syncing ${pendingCount}…` : 'Sync active'}
    </span>
  );
}
