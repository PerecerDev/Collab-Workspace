import { createMockRealtimeClient } from '@/realtime/socket/MockRealtimeClient';
import type { RealtimeClient } from '@/realtime/types/connection.types';

let clientInstance: RealtimeClient | null = null;

export function getRealtimeClient(): RealtimeClient {
  if (!clientInstance) {
    const mode = import.meta.env.VITE_REALTIME_MODE ?? 'mock';
    clientInstance =
      mode === 'mock' ? createMockRealtimeClient() : createMockRealtimeClient();
  }

  return clientInstance;
}

export function resetRealtimeClient(): void {
  clientInstance?.disconnect();
  clientInstance = null;
}
