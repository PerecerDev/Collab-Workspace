export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}

export type UserRole = 'owner' | 'editor' | 'viewer';

export interface WorkspaceMember {
  workspaceId: string;
  userId: string;
  role: UserRole;
  joinedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
}

export type CanvasObjectType =
  'sticky_note' | 'shape' | 'text' | 'task' | 'code' | 'connector';

export interface CanvasObject {
  id: string;
  workspaceId: string;
  type: CanvasObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface StickyNoteContent {
  text: string;
  color: string;
}

export type TaskBlockStatus = 'todo' | 'in_progress' | 'done';

export interface TaskBlockContent {
  title: string;
  status: TaskBlockStatus;
  assigneeId?: string;
}

export interface Comment {
  id: string;
  workspaceId: string;
  objectId?: string;
  authorId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityEvent {
  id: string;
  workspaceId: string;
  actorId: string;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
}
