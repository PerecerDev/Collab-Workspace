import { useEffect } from 'react';

import { useCanvasSelectionStore } from '@/features/canvas/stores/canvasStores';
import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import { usePresenceStore } from '@/realtime/presence/presenceStore';
import {
  OBJECT_EVENT_TYPES,
  type presenceSelectionPayloadSchema,
} from '@/realtime/events/objectEventSchemas';
import type { z } from 'zod';

type SelectionPayload = z.infer<typeof presenceSelectionPayloadSchema>;

interface UseSelectionSyncOptions {
  workspaceId: string | undefined;
  userId: string | undefined;
  enabled?: boolean;
}

export function useSelectionSync({
  workspaceId,
  userId,
  enabled = true,
}: UseSelectionSyncOptions) {
  const selectedIds = useCanvasSelectionStore((state) => state.selectedIds);

  useEffect(() => {
    if (!enabled || !workspaceId || !userId) return;

    const client = getRealtimeClient();
    if (client.getConnectionStatus() !== 'connected') return;

    const payload: SelectionPayload = { selectedObjectIds: selectedIds };

    client.emit({
      type: OBJECT_EVENT_TYPES.selection,
      workspaceId,
      actorId: userId,
      sessionId: client.getSessionId(),
      payload,
    });
  }, [enabled, selectedIds, userId, workspaceId]);

  useEffect(() => {
    if (!enabled || !workspaceId) return;

    const client = getRealtimeClient();

    return client.on<SelectionPayload>(
      OBJECT_EVENT_TYPES.selection,
      (payload, event) => {
        if (event.workspaceId !== workspaceId) return;

        const sessions =
          usePresenceStore.getState().sessionsByWorkspace[workspaceId] ?? [];

        const nextSessions = sessions.map((session) =>
          session.sessionId === event.sessionId
            ? { ...session, selectedObjectIds: payload.selectedObjectIds }
            : session,
        );

        usePresenceStore.getState().setRoomSessions(workspaceId, nextSessions);
      },
    );
  }, [enabled, workspaceId]);
}

export function useRemoteSelections(
  workspaceId: string | undefined,
  objectId: string,
  currentUserId?: string,
): Array<{ userId: string; userName: string; colorIndex: number }> {
  const sessions = usePresenceStore((state) =>
    workspaceId ? state.sessionsByWorkspace[workspaceId] : undefined,
  );

  if (!sessions) return [];

  return sessions
    .filter(
      (session) =>
        session.userId !== currentUserId &&
        session.selectedObjectIds?.includes(objectId),
    )
    .map((session) => ({
      userId: session.userId,
      userName: session.userName,
      colorIndex: session.colorIndex,
    }));
}
