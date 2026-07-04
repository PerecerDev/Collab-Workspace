import { useEffect } from 'react';

import { commentService } from '@/features/comments/services/commentService';
import { commentKeys } from '@/features/comments/hooks/useCommentsQuery';
import { getRealtimeClient } from '@/realtime/socket/realtimeClientFactory';
import {
  COMMENT_EVENT_TYPES,
  type commentCreatedPayloadSchema,
} from '@/realtime/events/commentEventSchemas';
import { useQueryClient } from '@tanstack/react-query';
import type { z } from 'zod';

type CommentCreatedPayload = z.infer<typeof commentCreatedPayloadSchema>;

interface UseCommentSyncOptions {
  workspaceId: string | undefined;
  userId: string | undefined;
  enabled?: boolean;
}

export function useCommentSync({
  workspaceId,
  userId,
  enabled = true,
}: UseCommentSyncOptions) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !workspaceId || !userId) return;

    const client = getRealtimeClient();

    const unsubscribe = client.on<CommentCreatedPayload>(
      COMMENT_EVENT_TYPES.created,
      (payload, event) => {
        if (event.workspaceId !== workspaceId) return;
        if (
          event.actorId === userId &&
          event.sessionId === client.getSessionId()
        ) {
          return;
        }

        commentService.applyRemoteComment(payload.comment);
        void queryClient.invalidateQueries({
          queryKey: ['comments', workspaceId],
        });
        void queryClient.invalidateQueries({
          queryKey: commentKeys.target(
            workspaceId,
            payload.comment.targetType,
            payload.comment.targetId,
          ),
        });
      },
    );

    return unsubscribe;
  }, [enabled, queryClient, userId, workspaceId]);
}
