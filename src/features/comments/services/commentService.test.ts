import { describe, expect, it, beforeEach } from 'vitest';

import { commentService } from '@/features/comments/services/commentService';
import { commentRepository } from '@/features/comments/services/commentRepository';

describe('commentService', () => {
  beforeEach(() => {
    commentRepository.write('ws-test', []);
  });

  it('creates and lists comments for an object target', async () => {
    const comment = await commentService.create({
      workspaceId: 'ws-test',
      targetType: 'object',
      targetId: 'obj-1',
      authorId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      body: 'Looks good to me',
    });

    const comments = await commentService.listByTarget(
      'ws-test',
      'object',
      'obj-1',
    );

    expect(comment.body).toBe('Looks good to me');
    expect(comments).toHaveLength(1);
    expect(comments[0]?.id).toBe(comment.id);
  });
});
