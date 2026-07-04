import { describe, expect, it } from 'vitest';

import {
  resolveByTimestamp,
  shouldApplyRemoteUpdate,
} from '@/sync/conflictResolver';

describe('conflictResolver', () => {
  it('applies remote when timestamp is newer', () => {
    expect(
      resolveByTimestamp({
        localUpdatedAt: '2026-01-01T10:00:00.000Z',
        remoteUpdatedAt: '2026-01-01T11:00:00.000Z',
        localActorId: 'a',
        remoteActorId: 'b',
      }),
    ).toBe('apply_remote');
  });

  it('keeps local when timestamp is newer', () => {
    expect(
      shouldApplyRemoteUpdate(
        '2026-01-01T12:00:00.000Z',
        'a',
        '2026-01-01T11:00:00.000Z',
        'b',
      ),
    ).toBe(false);
  });

  it('uses actor id as tie-breaker when timestamps match', () => {
    expect(
      resolveByTimestamp({
        localUpdatedAt: '2026-01-01T10:00:00.000Z',
        remoteUpdatedAt: '2026-01-01T10:00:00.000Z',
        localActorId: 'a',
        remoteActorId: 'b',
      }),
    ).toBe('apply_remote');
  });
});
