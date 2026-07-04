import { useEffect, type ReactNode } from 'react';

import { useAuth } from '@/features/auth/stores/authStore';
import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import { useConnectionStore } from '@/realtime/presence/connectionStore';

interface RealtimeProviderProps {
  children: ReactNode;
}

export function RealtimeProvider({ children }: RealtimeProviderProps) {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const client = getRealtimeClient();
    let cancelled = false;

    void client
      .connect({
        userId: user.id,
        userName: user.name,
      })
      .then(() => {
        if (!cancelled) {
          useConnectionStore.getState().markConnected();
        }
      });

    return () => {
      cancelled = true;
      client.disconnect();
      useConnectionStore.getState().setStatus('idle');
      useConnectionStore.getState().setCurrentRoom(null);
    };
  }, [isAuthenticated, user]);

  return children;
}
