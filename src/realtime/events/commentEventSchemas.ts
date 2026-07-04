import { z } from 'zod';

export const commentSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  targetType: z.enum(['workspace', 'object']),
  targetId: z.string().min(1),
  authorId: z.string().min(1),
  body: z.string().min(1).max(2000),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const commentCreatedPayloadSchema = z.object({
  comment: commentSchema,
});

export const COMMENT_EVENT_TYPES = {
  created: 'comment.created',
} as const;
