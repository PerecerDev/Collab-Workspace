import { ACTIVITY_TYPES, activityService } from '@/features/activity';
import { commentRepository } from '@/features/comments/services/commentRepository';
import type {
  Comment,
  CreateCommentInput,
} from '@/features/comments/types/comment.types';
import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import { COMMENT_EVENT_TYPES } from '@/realtime/events/commentEventSchemas';

const MOCK_DELAY_MS = 150;

function delay(ms = MOCK_DELAY_MS): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function emitCommentCreated(comment: Comment, actorId: string): void {
  const client = getRealtimeClient();
  if (client.getConnectionStatus() !== 'connected') return;

  client.emit({
    type: COMMENT_EVENT_TYPES.created,
    workspaceId: comment.workspaceId,
    actorId,
    sessionId: client.getSessionId(),
    payload: { comment },
  });
}

export const commentService = {
  async listByTarget(
    workspaceId: string,
    targetType: Comment['targetType'],
    targetId: string,
  ): Promise<Comment[]> {
    await delay();
    return commentRepository
      .read(workspaceId)
      .filter(
        (comment) =>
          comment.targetType === targetType && comment.targetId === targetId,
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  },

  async create(input: CreateCommentInput): Promise<Comment> {
    await delay();

    const now = new Date().toISOString();
    const comment: Comment = {
      id: crypto.randomUUID(),
      workspaceId: input.workspaceId,
      targetType: input.targetType,
      targetId: input.targetId,
      authorId: input.authorId,
      body: input.body.trim(),
      createdAt: now,
      updatedAt: now,
    };

    const comments = [...commentRepository.read(input.workspaceId), comment];
    commentRepository.write(input.workspaceId, comments);

    emitCommentCreated(comment, input.authorId);

    void activityService.record(
      input.workspaceId,
      input.authorId,
      ACTIVITY_TYPES.commentCreated,
      {
        targetType: input.targetType,
        targetId: input.targetId,
        targetLabel:
          input.targetType === 'object' ? 'a canvas object' : 'the workspace',
      },
    );

    return comment;
  },

  applyRemoteComment(comment: Comment): void {
    const existing = commentRepository.read(comment.workspaceId);
    if (existing.some((item) => item.id === comment.id)) return;
    commentRepository.write(comment.workspaceId, [...existing, comment]);
  },
};
