import { useQuery } from '@tanstack/react-query';

import { workspaceService } from '@/features/workspace/services/workspaceService';

export const workspaceKeys = {
  all: ['workspaces'] as const,
  detail: (id: string) => ['workspaces', id] as const,
};

export function useWorkspacesQuery() {
  return useQuery({
    queryKey: workspaceKeys.all,
    queryFn: workspaceService.listWorkspaces,
  });
}

export function useWorkspaceQuery(id: string | undefined) {
  return useQuery({
    queryKey: workspaceKeys.detail(id ?? ''),
    queryFn: () => workspaceService.getWorkspace(id ?? ''),
    enabled: Boolean(id),
  });
}
