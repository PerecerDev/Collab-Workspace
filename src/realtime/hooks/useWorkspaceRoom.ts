import { useEffect } from 'react';

import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import { useConnectionStore } from '@/realtime/presence/connectionStore';
import { usePresenceStore } from '@/realtime/presence/presenceStore';
import { REALTIME_EVENT_TYPES } from '@/realtime/types/presence.types';
import type { RoomSyncPayload } from '@/realtime/types/presence.types';

export function useWorkspaceRoom(workspaceId: string | undefined) {
  const client = getRealtimeClient();

  useEffect(() => {
    if (!workspaceId) return;

    client.joinRoom(workspaceId);
    useConnectionStore.getState().setCurrentRoom(workspaceId);

    const unsubscribe = client.on<RoomSyncPayload>(
      REALTIME_EVENT_TYPES.roomSync,
      (payload, event) => {
        if (event.workspaceId !== workspaceId) return;
        usePresenceStore
          .getState()
          .setRoomSessions(workspaceId, payload.sessions);
      },
    );

    return () => {
      unsubscribe();
      client.leaveRoom();
      useConnectionStore.getState().setCurrentRoom(null);
      usePresenceStore.getState().clearWorkspace(workspaceId);
    };
  }, [client, workspaceId]);
}
