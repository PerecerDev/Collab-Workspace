import { MOCK_USERS } from '@/shared/mocks/data';

import { ACTIVITY_TYPES } from '@/features/activity/types/activity.types';
import type { ActivityEvent } from '@/features/activity/types/activity.types';
import { TASK_STATUS_LABELS } from '@/features/tasks/types/task.types';

function resolveUserName(userId: string): string {
  return MOCK_USERS.find((user) => user.id === userId)?.name ?? 'Someone';
}

export function formatActivityMessage(event: ActivityEvent): string {
  const actor = resolveUserName(event.actorId);
  const payload = event.payload;

  switch (event.type) {
    case ACTIVITY_TYPES.objectCreated:
      return `${actor} created a ${String(payload.objectType ?? 'block')}`;
    case ACTIVITY_TYPES.objectUpdated:
      return `${actor} updated a canvas object`;
    case ACTIVITY_TYPES.objectDeleted:
      return `${actor} deleted a canvas object`;
    case ACTIVITY_TYPES.commentCreated:
      return `${actor} commented on ${String(payload.targetLabel ?? 'an object')}`;
    case ACTIVITY_TYPES.taskStatusChanged: {
      const status = payload.status as keyof typeof TASK_STATUS_LABELS;
      return `${actor} moved a task to ${TASK_STATUS_LABELS[status] ?? payload.status}`;
    }
    case ACTIVITY_TYPES.taskAssigned:
      return `${actor} assigned a task to ${resolveUserName(String(payload.assigneeId ?? ''))}`;
    case 'workspace.opened':
      return 'Workspace canvas is ready';
    default:
      return `${actor} performed an action`;
  }
}
