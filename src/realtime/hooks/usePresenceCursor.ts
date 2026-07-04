import { useCallback, useEffect } from 'react';

import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import { useAuth } from '@/features/auth/stores/authStore';
import { REALTIME_EVENT_TYPES } from '@/realtime/types/presence.types';
import type { PresenceCursorPayload } from '@/realtime/types/presence.types';

interface UsePresenceCursorOptions {
  workspaceId: string | undefined;
  enabled?: boolean;
}

export function usePresenceCursor({
  workspaceId,
  enabled = true,
}: UsePresenceCursorOptions) {
  const { user } = useAuth();
  const client = getRealtimeClient();

  const emitCursor = useCallback(
    (x: number, y: number) => {
      if (!workspaceId || !user || !enabled) return;
      if (client.getConnectionStatus() !== 'connected') return;

      const payload: PresenceCursorPayload = { x, y };
      client.emit({
        type: REALTIME_EVENT_TYPES.presenceCursor,
        workspaceId,
        actorId: user.id,
        sessionId: client.getSessionId(),
        payload,
      });
    },
    [client, enabled, user, workspaceId],
  );

  useEffect(() => {
    if (!enabled) return;

    const handleVisibility = () => {
      if (!workspaceId || !user) return;

      client.emit({
        type: REALTIME_EVENT_TYPES.presenceUpdate,
        workspaceId,
        actorId: user.id,
        sessionId: client.getSessionId(),
        payload: {
          status: document.hidden ? 'away' : 'active',
        },
      });
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, [client, enabled, user, workspaceId]);

  return { emitCursor };
}
