import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { commentService } from '@/features/comments/services/commentService';
import type { CommentTargetType } from '@/features/comments/types/comment.types';

export const commentKeys = {
  target: (
    workspaceId: string,
    targetType: CommentTargetType,
    targetId: string,
  ) => ['comments', workspaceId, targetType, targetId] as const,
};

export function useCommentsQuery(
  workspaceId: string | undefined,
  targetType: CommentTargetType,
  targetId: string | undefined,
) {
  return useQuery({
    queryKey: commentKeys.target(workspaceId ?? '', targetType, targetId ?? ''),
    queryFn: () =>
      commentService.listByTarget(
        workspaceId ?? '',
        targetType,
        targetId ?? '',
      ),
    enabled: Boolean(workspaceId && targetId),
  });
}

interface CreateCommentVariables {
  authorId: string;
  body: string;
}

export function useCreateCommentMutation(
  workspaceId: string,
  targetType: CommentTargetType,
  targetId: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ authorId, body }: CreateCommentVariables) =>
      commentService.create({
        workspaceId,
        targetType,
        targetId,
        authorId,
        body,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: commentKeys.target(workspaceId, targetType, targetId),
      });
      void queryClient.invalidateQueries({
        queryKey: ['activity', workspaceId],
      });
    },
  });
}
