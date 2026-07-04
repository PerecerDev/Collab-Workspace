import {
  isConnectionDisrupted,
  useConnectionStore,
} from '@/realtime/presence/connectionStore';
import { Spinner } from '@/shared/components/ui/Spinner';

export function ReconnectOverlay() {
  const status = useConnectionStore((state) => state.status);
  const reconnectAttempt = useConnectionStore(
    (state) => state.reconnectAttempt,
  );

  if (status !== 'reconnecting') return null;

  return (
    <div
      className="bg-background/70 absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="reconnect-title"
      aria-describedby="reconnect-description"
    >
      <div className="border-border bg-surface max-w-sm rounded-xl border p-6 text-center shadow-lg">
        <Spinner className="mx-auto" label="Reconnecting" />
        <h2
          id="reconnect-title"
          className="text-text-primary mt-4 text-sm font-medium"
        >
          Reconnecting…
        </h2>
        <p id="reconnect-description" className="text-text-muted mt-2 text-sm">
          Restoring your session
          {reconnectAttempt > 0 ? ` (attempt ${reconnectAttempt})` : ''}.
        </p>
      </div>
    </div>
  );
}

export function useShowReconnectOverlay(): boolean {
  const status = useConnectionStore((state) => state.status);
  return isConnectionDisrupted(status) && status === 'reconnecting';
}
