import { useQuery } from '@tanstack/react-query';

import { activityService } from '@/features/activity/services/activityService';

export const activityKeys = {
  all: (workspaceId: string) => ['activity', workspaceId] as const,
};

export function useActivityFeed(workspaceId: string | undefined) {
  return useQuery({
    queryKey: activityKeys.all(workspaceId ?? ''),
    queryFn: () => activityService.list(workspaceId ?? ''),
    enabled: Boolean(workspaceId),
    refetchInterval: 5000,
  });
}
