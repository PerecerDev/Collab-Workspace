import { describe, expect, it } from 'vitest';

import { ACTIVITY_TYPES } from '@/features/activity/types/activity.types';
import { formatActivityMessage } from '@/features/activity/utils/formatActivityMessage';

describe('formatActivityMessage', () => {
  it('formats task status changes', () => {
    const message = formatActivityMessage({
      id: '1',
      workspaceId: 'ws-1',
      actorId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      type: ACTIVITY_TYPES.taskStatusChanged,
      payload: { status: 'done' },
      createdAt: new Date().toISOString(),
    });

    expect(message).toContain('Alex Parker');
    expect(message).toContain('Done');
  });
});
