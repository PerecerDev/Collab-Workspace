import { useEffect } from 'react';

import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import {
  isConnectionDisrupted,
  useConnectionStore,
} from '@/realtime/presence/connectionStore';

export function useRealtimeConnection() {
  const status = useConnectionStore((state) => state.status);
  const currentRoom = useConnectionStore((state) => state.currentRoom);
  const lastConnectedAt = useConnectionStore((state) => state.lastConnectedAt);
  const reconnectAttempt = useConnectionStore(
    (state) => state.reconnectAttempt,
  );

  useEffect(() => {
    const client = getRealtimeClient();
    return client.onConnectionChange((nextStatus) => {
      useConnectionStore.getState().setStatus(nextStatus);
      if (nextStatus === 'connected') {
        useConnectionStore.getState().markConnected();
      }
      if (nextStatus === 'reconnecting') {
        useConnectionStore.getState().incrementReconnectAttempt();
      }
    });
  }, []);

  return {
    status,
    currentRoom,
    lastConnectedAt,
    reconnectAttempt,
    isHealthy: !isConnectionDisrupted(status),
    isDisrupted: isConnectionDisrupted(status),
    client: getRealtimeClient(),
  };
}
