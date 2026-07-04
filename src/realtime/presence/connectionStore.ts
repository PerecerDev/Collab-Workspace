import { create } from 'zustand';

import type { ConnectionStatus } from '@/realtime/types/connection.types';

interface ConnectionState {
  status: ConnectionStatus;
  currentRoom: string | null;
  lastConnectedAt: string | null;
  reconnectAttempt: number;
  setStatus: (status: ConnectionStatus) => void;
  setCurrentRoom: (roomId: string | null) => void;
  incrementReconnectAttempt: () => void;
  resetReconnectAttempt: () => void;
  markConnected: () => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  status: 'idle',
  currentRoom: null,
  lastConnectedAt: null,
  reconnectAttempt: 0,

  setStatus: (status) => set({ status }),

  setCurrentRoom: (currentRoom) => set({ currentRoom }),

  incrementReconnectAttempt: () =>
    set((state) => ({ reconnectAttempt: state.reconnectAttempt + 1 })),

  resetReconnectAttempt: () => set({ reconnectAttempt: 0 }),

  markConnected: () =>
    set({
      lastConnectedAt: new Date().toISOString(),
      reconnectAttempt: 0,
    }),
}));

export function isConnectionHealthy(status: ConnectionStatus): boolean {
  return status === 'connected' || status === 'connecting';
}

export function isConnectionDisrupted(status: ConnectionStatus): boolean {
  return (
    status === 'reconnecting' ||
    status === 'disconnected' ||
    status === 'offline'
  );
}
