import type { PresenceSession } from '@/realtime/types/presence.types';

const CHANNEL_NAME = 'collab-workspace-realtime';

export interface HubBroadcastMessage {
  sourceSessionId: string;
  event: unknown;
}

export class MockRealtimeHub {
  private channel: BroadcastChannel | null = null;
  private readonly rooms = new Map<string, Map<string, PresenceSession>>();
  private listener: ((message: HubBroadcastMessage) => void) | null = null;

  start(onMessage: (message: HubBroadcastMessage) => void): void {
    if (typeof BroadcastChannel === 'undefined') return;

    this.listener = onMessage;
    this.channel = new BroadcastChannel(CHANNEL_NAME);
    this.channel.onmessage = (message) => {
      const data = message.data as HubBroadcastMessage;
      this.processEvent(data.event);
      onMessage(data);
    };
  }

  stop(): void {
    this.channel?.close();
    this.channel = null;
    this.listener = null;
    this.rooms.clear();
  }

  broadcast(sourceSessionId: string, event: unknown): void {
    this.processEvent(event);
    this.channel?.postMessage({
      sourceSessionId,
      event,
    } satisfies HubBroadcastMessage);
    this.listener?.({ sourceSessionId, event });
  }

  getRoomSessions(workspaceId: string): PresenceSession[] {
    const room = this.rooms.get(workspaceId);
    return room ? Array.from(room.values()) : [];
  }

  private processEvent(raw: unknown): void {
    if (!raw || typeof raw !== 'object') return;

    const event = raw as {
      type?: string;
      workspaceId?: string;
      sessionId?: string;
      payload?: Record<string, unknown>;
    };

    if (!event.type || !event.workspaceId) return;

    if (event.type === 'presence.join') {
      const payload = event.payload as {
        userName: string;
        colorIndex: number;
      };
      const actorId = (raw as { actorId?: string }).actorId;
      if (!actorId || !event.sessionId) return;

      const room = this.getOrCreateRoom(event.workspaceId);
      room.set(event.sessionId, {
        sessionId: event.sessionId,
        userId: actorId,
        userName: payload.userName,
        workspaceId: event.workspaceId,
        status: 'active',
        lastSeenAt: new Date().toISOString(),
        colorIndex: payload.colorIndex,
      });
      return;
    }

    if (event.type === 'presence.leave') {
      const room = this.rooms.get(event.workspaceId);
      const sessionId =
        (event.payload as { sessionId?: string })?.sessionId ?? event.sessionId;
      room?.delete(sessionId ?? '');
      return;
    }

    if (event.type === 'presence.update' || event.type === 'presence.cursor') {
      const room = this.rooms.get(event.workspaceId);
      const session = event.sessionId ? room?.get(event.sessionId) : undefined;
      if (!session) return;

      if (event.type === 'presence.cursor') {
        session.cursor = event.payload as { x: number; y: number };
      } else {
        const payload = event.payload as {
          status?: PresenceSession['status'];
          cursor?: PresenceSession['cursor'];
        };
        if (payload.status) session.status = payload.status;
        if (payload.cursor) session.cursor = payload.cursor;
      }

      session.lastSeenAt = new Date().toISOString();
      return;
    }

    if (event.type === 'presence.selection') {
      const room = this.rooms.get(event.workspaceId);
      const session = event.sessionId ? room?.get(event.sessionId) : undefined;
      if (!session) return;

      session.selectedObjectIds = (
        event.payload as { selectedObjectIds?: string[] }
      ).selectedObjectIds;
      session.lastSeenAt = new Date().toISOString();
    }
  }

  private getOrCreateRoom(workspaceId: string): Map<string, PresenceSession> {
    const existing = this.rooms.get(workspaceId);
    if (existing) return existing;

    const room = new Map<string, PresenceSession>();
    this.rooms.set(workspaceId, room);
    return room;
  }
}

export const mockRealtimeHub = new MockRealtimeHub();
