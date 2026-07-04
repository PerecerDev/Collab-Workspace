import { useState } from 'react';

import { useAuth } from '@/features/auth/stores/authStore';
import {
  useCommentsQuery,
  useCreateCommentMutation,
} from '@/features/comments/hooks/useCommentsQuery';
import type { CommentTargetType } from '@/features/comments/types/comment.types';
import { formatRelativeTime } from '@/features/workspace/utils/formatRelativeTime';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Button } from '@/shared/components/ui/Button';
import { Textarea } from '@/shared/components/ui/Textarea';
import { MOCK_USERS } from '@/shared/mocks/data';

interface CommentThreadProps {
  workspaceId: string;
  targetType: CommentTargetType;
  targetId: string;
  emptyMessage?: string;
}

function resolveAuthorName(authorId: string): string {
  return MOCK_USERS.find((user) => user.id === authorId)?.name ?? 'Unknown';
}

export function CommentThread({
  workspaceId,
  targetType,
  targetId,
  emptyMessage = 'No comments yet.',
}: CommentThreadProps) {
  const { user } = useAuth();
  const [body, setBody] = useState('');
  const { data: comments, isLoading } = useCommentsQuery(
    workspaceId,
    targetType,
    targetId,
  );
  const createComment = useCreateCommentMutation(
    workspaceId,
    targetType,
    targetId,
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !body.trim()) return;

    await createComment.mutateAsync({
      authorId: user.id,
      body: body.trim(),
    });
    setBody('');
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <p className="text-text-muted px-4 py-4 text-sm">Loading comments…</p>
        ) : !comments?.length ? (
          <p className="text-text-muted px-4 py-4 text-sm">{emptyMessage}</p>
        ) : (
          <ul className="divide-border divide-y">
            {comments.map((comment) => (
              <li key={comment.id} className="px-4 py-3">
                <div className="flex items-start gap-3">
                  <Avatar
                    name={resolveAuthorName(comment.authorId)}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-text-primary text-sm font-medium">
                        {resolveAuthorName(comment.authorId)}
                      </p>
                      <span className="text-text-muted text-xs">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-text-primary mt-1 text-sm whitespace-pre-wrap">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        className="border-border space-y-3 border-t p-4"
        onSubmit={handleSubmit}
      >
        <Textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Write a comment…"
          rows={3}
        />
        <Button
          type="submit"
          size="sm"
          disabled={!body.trim() || createComment.isPending}
          isLoading={createComment.isPending}
        >
          Post comment
        </Button>
      </form>
    </div>
  );
}
