import { Link } from 'react-router-dom';

import { WorkspaceCard } from '@/features/workspace/components/WorkspaceCard';
import { WorkspaceSearch } from '@/features/workspace/components/WorkspaceSearch';
import { useWorkspaceSearch } from '@/features/workspace/hooks/useWorkspaceSearch';
import { useWorkspacesQuery } from '@/features/workspace/hooks/useWorkspacesQuery';
import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/Spinner';
import { ROUTES } from '@/shared/lib/constants';

export function WorkspacesPage() {
  const {
    data: workspaces,
    isLoading,
    isError,
    refetch,
  } = useWorkspacesQuery();
  const { query, setQuery, filteredWorkspaces } =
    useWorkspaceSearch(workspaces);

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
        <Link to={ROUTES.workspacesNew}>
          <Button>New workspace</Button>
        </Link>
      </div>

      <WorkspaceSearch
        className="mb-6 max-w-md"
        value={query}
        onChange={setQuery}
        resultCount={workspaces ? filteredWorkspaces.length : undefined}
      />

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

      {workspaces && filteredWorkspaces.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkspaces.map((workspace) => (
            <li key={workspace.id}>
              <WorkspaceCard workspace={workspace} />
            </li>
          ))}
        </ul>
      ) : null}

      {workspaces && workspaces.length === 0 ? (
        <div className="border-border bg-surface rounded-xl border border-dashed p-10 text-center">
          <p className="text-text-primary text-sm font-medium">
            No workspaces yet
          </p>
          <p className="text-text-muted mt-2 text-sm">
            Create your first workspace to start collaborating.
          </p>
          <Link to={ROUTES.workspacesNew} className="mt-4 inline-block">
            <Button>Create workspace</Button>
          </Link>
        </div>
      ) : null}

      {workspaces &&
      workspaces.length > 0 &&
      filteredWorkspaces.length === 0 ? (
        <div className="border-border bg-surface rounded-xl border p-8 text-center">
          <p className="text-text-muted text-sm">
            No workspaces match &ldquo;{query}&rdquo;.
          </p>
        </div>
      ) : null}
    </div>
  );
}
