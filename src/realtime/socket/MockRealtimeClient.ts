import { EventDispatcher } from '@/realtime/events/eventDispatcher';
import { mockRealtimeHub } from '@/realtime/socket/mockRealtimeHub';
import type {
  ConnectionHandler,
  ConnectionStatus,
  DomainEvent,
  EventHandler,
  RealtimeClient,
  RealtimeConnectOptions,
  Unsubscribe,
} from '@/realtime/types/connection.types';
import { REALTIME_EVENT_TYPES } from '@/realtime/types/presence.types';
import type { RoomSyncPayload } from '@/realtime/types/presence.types';

const CURSOR_THROTTLE_MS = 33;

function createEventId(): string {
  return crypto.randomUUID();
}

function pickColorIndex(userId: string): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i += 1) {
    hash = (hash + userId.charCodeAt(i)) % 5;
  }
  return hash;
}

export class MockRealtimeClient implements RealtimeClient {
  private readonly dispatcher = new EventDispatcher();
  private readonly connectionHandlers = new Set<ConnectionHandler>();
  private readonly sessionId = crypto.randomUUID();

  private status: ConnectionStatus = 'idle';
  private connectOptions: RealtimeConnectOptions | null = null;
  private currentRoom: string | null = null;
  private heartbeatTimer: number | null = null;
  private lastCursorEmit = 0;
  private hubStarted = false;

  async connect(options: RealtimeConnectOptions): Promise<void> {
    this.setStatus('connecting');
    this.connectOptions = options;

    await new Promise((resolve) => window.setTimeout(resolve, 120));

    if (!this.hubStarted) {
      mockRealtimeHub.start((message) => {
        if (message.sourceSessionId === this.sessionId) return;
        this.handleInbound(message.event);
      });
      this.hubStarted = true;
    }

    this.setStatus('connected');
    this.startHeartbeat();

    window.addEventListener('online', this.boundHandleOnline);
    window.addEventListener('offline', this.boundHandleOffline);
    window.addEventListener('beforeunload', this.boundHandleBeforeUnload);
  }

  disconnect(): void {
    if (this.currentRoom) {
      this.leaveRoom();
    }

    this.stopHeartbeat();
    window.removeEventListener('online', this.boundHandleOnline);
    window.removeEventListener('offline', this.boundHandleOffline);
    window.removeEventListener('beforeunload', this.boundHandleBeforeUnload);

    this.connectOptions = null;
    this.setStatus('disconnected');
  }

  joinRoom(workspaceId: string): void {
    if (!this.connectOptions) return;

    if (this.currentRoom && this.currentRoom !== workspaceId) {
      this.leaveRoom();
    }

    this.currentRoom = workspaceId;

    this.broadcast({
      type: REALTIME_EVENT_TYPES.presenceJoin,
      workspaceId,
      actorId: this.connectOptions.userId,
      sessionId: this.sessionId,
      payload: {
        userName: this.connectOptions.userName,
        colorIndex: pickColorIndex(this.connectOptions.userId),
      },
    });

    this.syncRoom(workspaceId);
  }

  leaveRoom(): void {
    if (!this.currentRoom || !this.connectOptions) return;

    this.broadcast({
      type: REALTIME_EVENT_TYPES.presenceLeave,
      workspaceId: this.currentRoom,
      actorId: this.connectOptions.userId,
      sessionId: this.sessionId,
      payload: { sessionId: this.sessionId },
    });

    this.currentRoom = null;
  }

  emit<T>(event: Omit<DomainEvent<T>, 'id' | 'version' | 'timestamp'>): void {
    if (this.status !== 'connected') return;

    if (event.type === REALTIME_EVENT_TYPES.presenceCursor) {
      const now = Date.now();
      if (now - this.lastCursorEmit < CURSOR_THROTTLE_MS) return;
      this.lastCursorEmit = now;
    }

    this.broadcast(event);
  }

  on<T>(eventType: string, handler: EventHandler<T>): Unsubscribe {
    return this.dispatcher.on(eventType, handler);
  }

  onConnectionChange(handler: ConnectionHandler): Unsubscribe {
    this.connectionHandlers.add(handler);
    handler(this.status);
    return () => this.connectionHandlers.delete(handler);
  }

  getConnectionStatus(): ConnectionStatus {
    return this.status;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getCurrentRoom(): string | null {
    return this.currentRoom;
  }

  private broadcast<T>(
    event: Omit<DomainEvent<T>, 'id' | 'version' | 'timestamp'>,
  ): void {
    const fullEvent: DomainEvent<T> = {
      ...event,
      id: createEventId(),
      version: 1,
      timestamp: new Date().toISOString(),
    };

    mockRealtimeHub.broadcast(this.sessionId, fullEvent);
    this.handleInbound(fullEvent);
  }

  private handleInbound(raw: unknown): void {
    const event = this.dispatcher.dispatch(raw);
    if (!event) return;

    if (
      event.type === REALTIME_EVENT_TYPES.presenceJoin ||
      event.type === REALTIME_EVENT_TYPES.presenceLeave ||
      event.type === REALTIME_EVENT_TYPES.presenceUpdate ||
      event.type === REALTIME_EVENT_TYPES.presenceCursor
    ) {
      this.syncRoom(event.workspaceId);
    }
  }

  private syncRoom(workspaceId: string): void {
    if (!this.connectOptions) return;

    const payload: RoomSyncPayload = {
      sessions: mockRealtimeHub.getRoomSessions(workspaceId),
    };

    this.dispatcher.dispatch({
      id: createEventId(),
      version: 1,
      type: REALTIME_EVENT_TYPES.roomSync,
      workspaceId,
      actorId: this.connectOptions.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      payload,
    });
  }

  private setStatus(status: ConnectionStatus): void {
    this.status = status;
    this.connectionHandlers.forEach((handler) => handler(status));
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatTimer = window.setInterval(() => {
      if (!this.currentRoom || !this.connectOptions) return;

      this.broadcast({
        type: REALTIME_EVENT_TYPES.systemPing,
        workspaceId: this.currentRoom,
        actorId: this.connectOptions.userId,
        sessionId: this.sessionId,
        payload: {},
      });
    }, 15000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer !== null) {
      window.clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private readonly boundHandleOnline = (): void => {
    if (!this.connectOptions) return;
    this.setStatus('reconnecting');
    window.setTimeout(() => {
      this.setStatus('connected');
      if (this.currentRoom) this.joinRoom(this.currentRoom);
    }, 500);
  };

  private readonly boundHandleOffline = (): void => {
    this.setStatus('offline');
  };

  private readonly boundHandleBeforeUnload = (): void => {
    this.leaveRoom();
  };
}

export function createMockRealtimeClient(): RealtimeClient {
  return new MockRealtimeClient();
}
