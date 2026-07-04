export const ACTIVITY_TYPES = {
  objectCreated: 'object.created',
  objectUpdated: 'object.updated',
  objectDeleted: 'object.deleted',
  commentCreated: 'comment.created',
  taskStatusChanged: 'task.status_changed',
  taskAssigned: 'task.assigned',
} as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[keyof typeof ACTIVITY_TYPES];

export interface ActivityEvent {
  id: string;
  workspaceId: string;
  actorId: string;
  type: ActivityType | string;
  payload: Record<string, unknown>;
  createdAt: string;
}
