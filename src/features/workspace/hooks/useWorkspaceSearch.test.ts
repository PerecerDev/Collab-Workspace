import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useWorkspaceSearch } from '@/features/workspace/hooks/useWorkspaceSearch';
import type { Workspace } from '@/shared/types/domain';

const workspaces: Workspace[] = [
  {
    id: 'ws-a',
    name: 'Product Roadmap',
    description: 'Planning',
    ownerId: '1',
    memberIds: ['1'],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'ws-b',
    name: 'Design System',
    description: 'Tokens and components',
    ownerId: '1',
    memberIds: ['1'],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
];

describe('useWorkspaceSearch', () => {
  it('returns all workspaces when query is empty', () => {
    const { result } = renderHook(() => useWorkspaceSearch(workspaces));
    expect(result.current.filteredWorkspaces).toHaveLength(2);
    expect(result.current.hasActiveSearch).toBe(false);
  });
});
