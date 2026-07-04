import { activityRepository } from '@/features/activity/services/activityRepository';
import type {
  ActivityEvent,
  ActivityType,
} from '@/features/activity/types/activity.types';

const MOCK_DELAY_MS = 120;

function delay(ms = MOCK_DELAY_MS): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export const activityService = {
  async list(workspaceId: string): Promise<ActivityEvent[]> {
    await delay();
    return activityRepository
      .read(workspaceId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  },

  async record(
    workspaceId: string,
    actorId: string,
    type: ActivityType | string,
    payload: Record<string, unknown>,
  ): Promise<ActivityEvent> {
    await delay(40);

    const event: ActivityEvent = {
      id: crypto.randomUUID(),
      workspaceId,
      actorId,
      type,
      payload,
      createdAt: new Date().toISOString(),
    };

    const events = [event, ...activityRepository.read(workspaceId)].slice(
      0,
      100,
    );
    activityRepository.write(workspaceId, events);
    return event;
  },
};
