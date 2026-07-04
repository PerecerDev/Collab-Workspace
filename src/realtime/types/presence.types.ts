export type PresenceStatus = 'active' | 'idle' | 'away';

export interface CursorPosition {
  x: number;
  y: number;
}

export interface PresenceSession {
  sessionId: string;
  userId: string;
  userName: string;
  workspaceId: string;
  status: PresenceStatus;
  lastSeenAt: string;
  cursor?: CursorPosition;
  colorIndex: number;
  selectedObjectIds?: string[];
}

export interface PresenceUser {
  userId: string;
  userName: string;
  workspaceId: string;
  status: PresenceStatus;
  lastSeenAt: string;
  cursor?: CursorPosition;
  colorIndex: number;
  sessionIds: string[];
}

export interface PresenceJoinPayload {
  userName: string;
  colorIndex: number;
}

export interface PresenceUpdatePayload {
  status?: PresenceStatus;
  cursor?: CursorPosition;
}

export interface PresenceCursorPayload {
  x: number;
  y: number;
}

export interface PresenceLeavePayload {
  sessionId: string;
}

export interface RoomSyncPayload {
  sessions: PresenceSession[];
}

export const REALTIME_EVENT_TYPES = {
  presenceJoin: 'presence.join',
  presenceLeave: 'presence.leave',
  presenceUpdate: 'presence.update',
  presenceCursor: 'presence.cursor',
  roomSync: 'room.sync',
  systemPing: 'system.ping',
} as const;

export type RealtimeEventType =
  (typeof REALTIME_EVENT_TYPES)[keyof typeof REALTIME_EVENT_TYPES];
