import { useMemo, useState } from 'react';

import { useDebounce } from '@/shared/hooks/useDebounce';
import type { Workspace } from '@/shared/types/domain';

export function useWorkspaceSearch(workspaces: Workspace[] | undefined) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);

  const filteredWorkspaces = useMemo(() => {
    if (!workspaces) return [];
    const normalized = debouncedQuery.trim().toLowerCase();
    if (!normalized) return workspaces;

    return workspaces.filter((workspace) => {
      const haystack =
        `${workspace.name} ${workspace.description ?? ''}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [workspaces, debouncedQuery]);

  return {
    query,
    setQuery,
    filteredWorkspaces,
    hasActiveSearch: debouncedQuery.trim().length > 0,
  };
}
