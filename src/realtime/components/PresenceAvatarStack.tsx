import { Avatar } from '@/shared/components/ui/Avatar';
import { cn } from '@/shared/lib/cn';

import {
  getPresenceColorClass,
  usePresenceCount,
  usePresenceUsers,
} from '@/realtime/presence/presenceStore';

interface PresenceAvatarStackProps {
  workspaceId: string | undefined;
  currentUserId?: string;
  currentUserName?: string;
  maxVisible?: number;
  className?: string;
}

export function PresenceAvatarStack({
  workspaceId,
  currentUserId,
  currentUserName,
  maxVisible = 4,
  className,
}: PresenceAvatarStackProps) {
  const others = usePresenceUsers(workspaceId, currentUserId);
  const totalCount = usePresenceCount(workspaceId, currentUserId);
  const visibleOthers = others.slice(0, maxVisible);
  const overflow = Math.max(others.length - visibleOthers.length, 0);

  if (!workspaceId) return null;

  return (
    <div className={cn('flex items-center', className)}>
      <div
        className="flex -space-x-2"
        aria-label={`${totalCount} collaborators online`}
      >
        {currentUserId && currentUserName ? (
          <Avatar
            name={currentUserName}
            size="sm"
            className="ring-surface ring-2"
            presenceColor="bg-success"
          />
        ) : null}
        {visibleOthers.map((user) => (
          <Avatar
            key={user.userId}
            name={user.userName}
            size="sm"
            className="ring-surface ring-2"
            presenceColor={getPresenceColorClass(user.colorIndex)}
          />
        ))}
        {overflow > 0 ? (
          <span className="ring-surface bg-surface-elevated text-text-muted inline-flex size-8 items-center justify-center rounded-full text-xs font-medium ring-2">
            +{overflow}
          </span>
        ) : null}
      </div>
      <span className="text-text-muted ml-2 text-xs">{totalCount} online</span>
    </div>
  );
}
