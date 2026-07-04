import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/features/auth/stores/authStore';
import {
  WorkspaceBreadcrumbs,
  workspaceBreadcrumbs,
} from '@/features/workspace/components/WorkspaceBreadcrumbs';
import { WorkspaceForm } from '@/features/workspace/components/WorkspaceForm';
import { WorkspaceMembersList } from '@/features/workspace/components/WorkspaceMembersList';
import {
  getWorkspaceErrorMessage,
  useDeleteWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useWorkspaceMembersQuery,
  useWorkspaceQuery,
} from '@/features/workspace/hooks/useWorkspacesQuery';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/Spinner';
import { ROUTES } from '@/shared/lib/constants';

export function WorkspaceSettingsPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    data: workspace,
    isLoading,
    isError,
  } = useWorkspaceQuery(workspaceId);
  const { data: members, isLoading: membersLoading } =
    useWorkspaceMembersQuery(workspaceId);
  const updateWorkspace = useUpdateWorkspaceMutation(workspaceId ?? '');
  const deleteWorkspace = useDeleteWorkspaceMutation();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Spinner label="Loading workspace settings" />
      </div>
    );
  }

  if (isError || !workspace || !user) {
    return (
      <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-text-primary text-xl font-semibold">
          Workspace not found
        </h1>
        <Link to={ROUTES.workspaces} className="mt-6">
          <Button variant="secondary">Back to workspaces</Button>
        </Link>
      </div>
    );
  }

  const isOwner = workspace.ownerId === user.id;

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 lg:px-6">
      <WorkspaceBreadcrumbs
        className="mb-6"
        items={[...workspaceBreadcrumbs(workspace.name), { label: 'Settings' }]}
      />

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-semibold">
            Workspace settings
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            Manage details and members for this workspace.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to={ROUTES.workspace(workspace.id)}>
            <Button variant="secondary" size="sm">
              Open canvas
            </Button>
          </Link>
          {!isOwner ? <Badge>Viewer access</Badge> : null}
        </div>
      </div>

      <section className="border-border bg-surface mb-8 rounded-xl border p-6">
        <h2 className="text-text-primary text-sm font-medium">General</h2>
        <p className="text-text-muted mt-1 mb-6 text-sm">
          Update the workspace name and description.
        </p>

        <WorkspaceForm
          defaultValues={{
            name: workspace.name,
            description: workspace.description ?? '',
          }}
          submitLabel="Save changes"
          readOnly={!isOwner}
          isSubmitting={updateWorkspace.isPending}
          errorMessage={
            updateWorkspace.isError
              ? getWorkspaceErrorMessage(updateWorkspace.error)
              : null
          }
          onSubmit={async (values) => {
            await updateWorkspace.mutateAsync(values);
          }}
        />
      </section>

      <section className="border-border bg-surface mb-8 rounded-xl border p-6">
        <h2 className="text-text-primary text-sm font-medium">Members</h2>
        <p className="text-text-muted mt-1 mb-6 text-sm">
          People who can access and collaborate in this workspace.
        </p>

        <WorkspaceMembersList
          workspace={workspace}
          members={members}
          isLoading={membersLoading}
          currentUserId={user.id}
        />
      </section>

      {isOwner ? (
        <section className="border-destructive/30 bg-surface rounded-xl border p-6">
          <h2 className="text-destructive text-sm font-medium">Danger zone</h2>
          <p className="text-text-muted mt-1 mb-4 text-sm">
            Permanently delete this workspace and all its content.
          </p>

          {showDeleteConfirm ? (
            <div className="space-y-3">
              <p className="text-text-primary text-sm">
                Delete <strong>{workspace.name}</strong>? This cannot be undone.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="destructive"
                  isLoading={deleteWorkspace.isPending}
                  onClick={async () => {
                    await deleteWorkspace.mutateAsync(workspace.id);
                    navigate(ROUTES.workspaces);
                  }}
                >
                  Confirm delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
              {deleteWorkspace.isError ? (
                <p className="text-destructive text-sm" role="alert">
                  {getWorkspaceErrorMessage(deleteWorkspace.error)}
                </p>
              ) : null}
            </div>
          ) : (
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete workspace
            </Button>
          )}
        </section>
      ) : null}
    </div>
  );
}
