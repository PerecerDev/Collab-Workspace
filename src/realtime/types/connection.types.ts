export type ConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected'
  | 'offline';

export interface RealtimeConnectOptions {
  userId: string;
  userName: string;
  token?: string;
}

export interface RealtimeClientConfig {
  url?: string;
  mode?: 'mock' | 'socket';
  reconnectAttempts?: number;
  reconnectDelayMs?: number;
}

export interface DomainEvent<T = unknown> {
  id: string;
  version: 1;
  type: string;
  workspaceId: string;
  actorId: string;
  sessionId: string;
  timestamp: string;
  payload: T;
}

export type Unsubscribe = () => void;

export type EventHandler<T = unknown> = (
  payload: T,
  event: DomainEvent<T>,
) => void;

export type ConnectionHandler = (status: ConnectionStatus) => void;

export interface RealtimeClient {
  connect(options: RealtimeConnectOptions): Promise<void>;
  disconnect(): void;
  joinRoom(workspaceId: string): void;
  leaveRoom(): void;
  emit<T>(event: Omit<DomainEvent<T>, 'id' | 'version' | 'timestamp'>): void;
  on<T>(eventType: string, handler: EventHandler<T>): Unsubscribe;
  onConnectionChange(handler: ConnectionHandler): Unsubscribe;
  getConnectionStatus(): ConnectionStatus;
  getSessionId(): string;
  getCurrentRoom(): string | null;
}
