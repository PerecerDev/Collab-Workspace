export {
  ConnectionBanner,
  ConnectionStatus,
} from './components/ConnectionStatus';
export { LiveCursors } from './components/LiveCursors';
export { PresenceAvatarStack } from './components/PresenceAvatarStack';
export { ReconnectOverlay } from './components/ReconnectOverlay';
export { EventDispatcher } from './events/eventDispatcher';
export { parseDomainEvent, parseEventPayload } from './events/eventSchemas';
export { usePresenceCursor } from './hooks/usePresenceCursor';
export { useRealtimeConnection } from './hooks/useRealtimeConnection';
export { useWorkspaceRoom } from './hooks/useWorkspaceRoom';
export {
  isConnectionDisrupted,
  isConnectionHealthy,
  useConnectionStore,
} from './presence/connectionStore';
export {
  getPresenceColorClass,
  getPresenceUsers,
  usePresenceCount,
  usePresenceStore,
  usePresenceUsers,
} from './presence/presenceStore';
export { RealtimeProvider } from './providers/RealtimeProvider';
export { createMockRealtimeClient } from './socket/MockRealtimeClient';
export {
  getRealtimeClient,
  resetRealtimeClient,
} from './socket/realtimeClientFactory';
export { REALTIME_EVENT_TYPES } from './types/presence.types';
export type { DomainEvent, RealtimeClient } from './types/connection.types';
export type { PresenceSession, PresenceUser } from './types/presence.types';
