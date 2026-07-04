export type CommentTargetType = 'workspace' | 'object';

export interface Comment {
  id: string;
  workspaceId: string;
  targetType: CommentTargetType;
  targetId: string;
  authorId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentInput {
  workspaceId: string;
  targetType: CommentTargetType;
  targetId: string;
  authorId: string;
  body: string;
}
