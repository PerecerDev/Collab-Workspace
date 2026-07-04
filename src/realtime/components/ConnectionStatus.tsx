import { cn } from '@/shared/lib/cn';

import {
  isConnectionDisrupted,
  useConnectionStore,
} from '@/realtime/presence/connectionStore';
import type { ConnectionStatus } from '@/realtime/types/connection.types';

const STATUS_LABELS: Record<ConnectionStatus, string> = {
  idle: 'Offline',
  connecting: 'Connecting…',
  connected: 'Live',
  reconnecting: 'Reconnecting…',
  disconnected: 'Disconnected',
  offline: 'Offline',
};

const STATUS_VARIANTS: Record<ConnectionStatus, string> = {
  idle: 'bg-surface-elevated text-text-muted border-border',
  connecting: 'bg-warning/10 text-warning border-warning/20',
  connected: 'bg-success/10 text-success border-success/20',
  reconnecting: 'bg-warning/10 text-warning border-warning/20',
  disconnected: 'bg-destructive/10 text-destructive border-destructive/20',
  offline: 'bg-destructive/10 text-destructive border-destructive/20',
};

interface ConnectionStatusProps {
  className?: string;
  showLabel?: boolean;
}

export function ConnectionStatus({
  className,
  showLabel = true,
}: ConnectionStatusProps) {
  const status = useConnectionStore((state) => state.status);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        STATUS_VARIANTS[status],
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          status === 'connected' ? 'bg-success animate-pulse' : 'bg-current',
        )}
        aria-hidden="true"
      />
      {showLabel ? STATUS_LABELS[status] : null}
      <span className="sr-only">
        Connection status: {STATUS_LABELS[status]}
      </span>
    </span>
  );
}

export function ConnectionBanner({ className }: { className?: string }) {
  const status = useConnectionStore((state) => state.status);

  if (!isConnectionDisrupted(status)) return null;

  return (
    <div
      className={cn(
        'border-b px-4 py-2 text-center text-sm',
        status === 'offline'
          ? 'border-destructive/20 bg-destructive/10 text-destructive'
          : 'border-warning/20 bg-warning/10 text-warning',
        className,
      )}
      role="status"
      aria-live="assertive"
    >
      {status === 'offline'
        ? 'You are offline. Changes will sync when your connection returns.'
        : 'Reconnecting to the workspace…'}
    </div>
  );
}
