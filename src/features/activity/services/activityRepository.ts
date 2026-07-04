import { storage } from '@/shared/lib/storage';

import type { ActivityEvent } from '@/features/activity/types/activity.types';

const activityKey = (workspaceId: string) => `collab-activity:${workspaceId}`;

function seedActivity(workspaceId: string): ActivityEvent[] {
  const now = new Date().toISOString();

  return [
    {
      id: `${workspaceId}-activity-seed`,
      workspaceId,
      actorId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      type: 'workspace.opened',
      payload: { message: 'Workspace canvas ready for collaboration' },
      createdAt: now,
    },
  ];
}

export const activityRepository = {
  read(workspaceId: string): ActivityEvent[] {
    const stored = storage.get<ActivityEvent[]>(activityKey(workspaceId));
    if (stored && stored.length > 0) return stored;
    const seed = seedActivity(workspaceId);
    storage.set(activityKey(workspaceId), seed);
    return seed;
  },

  write(workspaceId: string, events: ActivityEvent[]): ActivityEvent[] {
    storage.set(activityKey(workspaceId), events);
    return events;
  },
};
