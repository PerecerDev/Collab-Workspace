import { useNavigate } from 'react-router-dom';

import { WorkspaceForm } from '@/features/workspace/components/WorkspaceForm';
import {
  getWorkspaceErrorMessage,
  useCreateWorkspaceMutation,
} from '@/features/workspace/hooks/useWorkspacesQuery';
import { ROUTES } from '@/shared/lib/constants';

export function CreateWorkspacePage() {
  const navigate = useNavigate();
  const createWorkspace = useCreateWorkspaceMutation();

  return (
    <div className="mx-auto w-full max-w-xl flex-1 px-4 py-8 lg:px-6">
      <div className="mb-8">
        <h1 className="text-text-primary text-2xl font-semibold">
          Create workspace
        </h1>
        <p className="text-text-muted mt-1 text-sm">
          Set up a shared space for your team to collaborate in real time.
        </p>
      </div>

      <div className="border-border bg-surface rounded-xl border p-6 shadow-sm">
        <WorkspaceForm
          submitLabel="Create workspace"
          isSubmitting={createWorkspace.isPending}
          errorMessage={
            createWorkspace.isError
              ? getWorkspaceErrorMessage(createWorkspace.error)
              : null
          }
          onCancel={() => navigate(ROUTES.workspaces)}
          onSubmit={async (values) => {
            try {
              const workspace = await createWorkspace.mutateAsync(values);
              navigate(ROUTES.workspace(workspace.id));
            } catch {
              // Error surfaced via mutation state
            }
          }}
        />
      </div>
    </div>
  );
}
