import { storage } from '@/shared/lib/storage';

import type { Comment } from '@/features/comments/types/comment.types';

const commentsKey = (workspaceId: string) => `collab-comments:${workspaceId}`;

export const commentRepository = {
  read(workspaceId: string): Comment[] {
    return storage.get<Comment[]>(commentsKey(workspaceId)) ?? [];
  },

  write(workspaceId: string, comments: Comment[]): Comment[] {
    storage.set(commentsKey(workspaceId), comments);
    return comments;
  },
};
