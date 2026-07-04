import { Link } from 'react-router-dom';

import { formatRelativeTime } from '@/features/workspace/utils/formatRelativeTime';
import { Badge } from '@/shared/components/ui/Badge';
import { ROUTES } from '@/shared/lib/constants';
import type { Workspace } from '@/shared/types/domain';

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <Link
      to={ROUTES.workspace(workspace.id)}
      className="group border-border bg-surface hover:border-accent/40 focus-visible:ring-accent block h-full rounded-xl border p-5 transition-all hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-text-primary group-hover:text-accent font-medium">
          {workspace.name}
        </h2>
        <Badge variant="accent">{workspace.memberIds.length} members</Badge>
      </div>
      <p className="text-text-muted text-sm">
        {workspace.description ?? 'No description'}
      </p>
      <p className="text-text-muted mt-4 text-xs">
        Updated {formatRelativeTime(workspace.updatedAt)}
      </p>
    </Link>
  );
}
