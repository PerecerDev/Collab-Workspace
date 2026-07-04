import { formatRelativeTime } from '@/features/workspace/utils/formatRelativeTime';
import { useActivityFeed } from '@/features/activity/hooks/useActivityFeed';
import { formatActivityMessage } from '@/features/activity/utils/formatActivityMessage';
import { Spinner } from '@/shared/components/ui/Spinner';

interface ActivityFeedProps {
  workspaceId: string;
}

export function ActivityFeed({ workspaceId }: ActivityFeedProps) {
  const { data: events, isLoading, isError } = useActivityFeed(workspaceId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner label="Loading activity" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive px-4 py-6 text-sm" role="alert">
        Could not load activity feed.
      </p>
    );
  }

  if (!events?.length) {
    return (
      <p className="text-text-muted px-4 py-6 text-sm">
        No activity yet. Create blocks, tasks, or comments to get started.
      </p>
    );
  }

  return (
    <ul className="divide-border divide-y">
      {events.map((event) => (
        <li key={event.id} className="px-4 py-3">
          <p className="text-text-primary text-sm">
            {formatActivityMessage(event)}
          </p>
          <p className="text-text-muted mt-1 text-xs">
            {formatRelativeTime(event.createdAt)}
          </p>
        </li>
      ))}
    </ul>
  );
}
