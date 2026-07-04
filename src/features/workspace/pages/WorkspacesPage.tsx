import { Link } from 'react-router-dom';

import { useWorkspacesQuery } from '@/features/workspace/hooks/useWorkspacesQuery';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/Spinner';
import { ROUTES } from '@/shared/lib/constants';

function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;

  return new Date(isoDate).toLocaleDateString();
}

export function WorkspacesPage() {
  const {
    data: workspaces,
    isLoading,
    isError,
    refetch,
  } = useWorkspacesQuery();

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-semibold">
            Workspaces
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            Open a workspace to collaborate on the shared canvas.
          </p>
        </div>
        <Button disabled title="Available in Phase 2">
          New workspace
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner label="Loading workspaces" />
        </div>
      ) : null}

      {isError ? (
        <div className="border-border bg-surface rounded-xl border p-6 text-center">
          <p className="text-text-muted text-sm">
            Unable to load workspaces. Please try again.
          </p>
          <Button
            className="mt-4"
            variant="secondary"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </div>
      ) : null}

      {workspaces ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((workspace) => (
            <li key={workspace.id}>
              <Link
                to={ROUTES.workspace(workspace.id)}
                className="group border-border bg-surface hover:border-accent/40 focus-visible:ring-accent block h-full rounded-xl border p-5 transition-all hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h2 className="text-text-primary group-hover:text-accent font-medium">
                    {workspace.name}
                  </h2>
                  <Badge variant="accent">
                    {workspace.memberIds.length} members
                  </Badge>
                </div>
                <p className="text-text-muted text-sm">
                  {workspace.description ?? 'No description'}
                </p>
                <p className="text-text-muted mt-4 text-xs">
                  Updated {formatRelativeTime(workspace.updatedAt)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
