import { describe, expect, it, vi } from 'vitest';

import { EventDispatcher } from '@/realtime/events/eventDispatcher';
import { REALTIME_EVENT_TYPES } from '@/realtime/types/presence.types';

describe('EventDispatcher', () => {
  it('validates and dispatches typed events to subscribers', () => {
    const dispatcher = new EventDispatcher();
    const handler = vi.fn();

    dispatcher.on(REALTIME_EVENT_TYPES.presenceJoin, handler);

    const event = {
      id: crypto.randomUUID(),
      version: 1 as const,
      type: REALTIME_EVENT_TYPES.presenceJoin,
      workspaceId: 'ws-test',
      actorId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      sessionId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      payload: {
        userName: 'Alex Parker',
        colorIndex: 0,
      },
    };

    const parsed = dispatcher.dispatch(event);

    expect(parsed).not.toBeNull();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0]?.[0]).toEqual(event.payload);
  });

  it('returns null for invalid payloads', () => {
    const dispatcher = new EventDispatcher();
    const result = dispatcher.dispatch({ type: 'invalid' });
    expect(result).toBeNull();
  });
});

describe('presenceStore merge', () => {
  it('deduplicates users with multiple sessions', async () => {
    const { usePresenceStore, getPresenceUsers } =
      await import('@/realtime/presence/presenceStore');

    usePresenceStore.getState().setRoomSessions('ws-test', [
      {
        sessionId: crypto.randomUUID(),
        userId: 'user-1',
        userName: 'Alex',
        workspaceId: 'ws-test',
        status: 'active',
        lastSeenAt: new Date().toISOString(),
        colorIndex: 0,
      },
      {
        sessionId: crypto.randomUUID(),
        userId: 'user-1',
        userName: 'Alex',
        workspaceId: 'ws-test',
        status: 'active',
        lastSeenAt: new Date().toISOString(),
        colorIndex: 0,
      },
    ]);

    expect(getPresenceUsers('ws-test')).toHaveLength(1);
  });
});
