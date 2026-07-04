import { create } from 'zustand';

import type {
  PresenceSession,
  PresenceUser,
} from '@/realtime/types/presence.types';

interface PresenceState {
  sessionsByWorkspace: Record<string, PresenceSession[]>;
  setRoomSessions: (workspaceId: string, sessions: PresenceSession[]) => void;
  clearWorkspace: (workspaceId: string) => void;
  clearAll: () => void;
}

function mergeSessionsToUsers(sessions: PresenceSession[]): PresenceUser[] {
  const users = new Map<string, PresenceUser>();

  sessions.forEach((session) => {
    const existing = users.get(session.userId);

    if (!existing) {
      users.set(session.userId, {
        userId: session.userId,
        userName: session.userName,
        workspaceId: session.workspaceId,
        status: session.status,
        lastSeenAt: session.lastSeenAt,
        cursor: session.cursor,
        colorIndex: session.colorIndex,
        sessionIds: [session.sessionId],
      });
      return;
    }

    users.set(session.userId, {
      ...existing,
      status:
        session.status === 'active' || existing.status === 'active'
          ? 'active'
          : session.status,
      lastSeenAt:
        new Date(session.lastSeenAt) > new Date(existing.lastSeenAt)
          ? session.lastSeenAt
          : existing.lastSeenAt,
      cursor: session.cursor ?? existing.cursor,
      sessionIds: [...existing.sessionIds, session.sessionId],
    });
  });

  return Array.from(users.values()).sort((a, b) =>
    a.userName.localeCompare(b.userName),
  );
}

export const usePresenceStore = create<PresenceState>((set) => ({
  sessionsByWorkspace: {},

  setRoomSessions: (workspaceId, sessions) =>
    set((state) => ({
      sessionsByWorkspace: {
        ...state.sessionsByWorkspace,
        [workspaceId]: sessions,
      },
    })),

  clearWorkspace: (workspaceId) =>
    set((state) => {
      const next = { ...state.sessionsByWorkspace };
      delete next[workspaceId];
      return { sessionsByWorkspace: next };
    }),

  clearAll: () => set({ sessionsByWorkspace: {} }),
}));

export function getPresenceUsers(workspaceId: string): PresenceUser[] {
  const sessions =
    usePresenceStore.getState().sessionsByWorkspace[workspaceId] ?? [];
  return mergeSessionsToUsers(sessions);
}

export function usePresenceUsers(
  workspaceId: string | undefined,
  currentUserId?: string,
): PresenceUser[] {
  const sessions = usePresenceStore((state) =>
    workspaceId ? state.sessionsByWorkspace[workspaceId] : undefined,
  );

  if (!workspaceId || !sessions) return [];

  return mergeSessionsToUsers(sessions).filter(
    (user) => user.userId !== currentUserId,
  );
}

export function usePresenceCount(
  workspaceId: string | undefined,
  currentUserId?: string,
): number {
  return (
    usePresenceUsers(workspaceId, currentUserId).length +
    (currentUserId ? 1 : 0)
  );
}

export const PRESENCE_COLOR_CLASSES = [
  'bg-presence-1',
  'bg-presence-2',
  'bg-presence-3',
  'bg-presence-4',
  'bg-presence-5',
] as const;

export const PRESENCE_TEXT_COLOR_CLASSES = [
  'text-presence-1',
  'text-presence-2',
  'text-presence-3',
  'text-presence-4',
  'text-presence-5',
] as const;

export function getPresenceColorClass(colorIndex: number): string {
  return PRESENCE_COLOR_CLASSES[colorIndex % PRESENCE_COLOR_CLASSES.length];
}

export function getPresenceTextColorClass(colorIndex: number): string {
  return PRESENCE_TEXT_COLOR_CLASSES[
    colorIndex % PRESENCE_TEXT_COLOR_CLASSES.length
  ];
}
