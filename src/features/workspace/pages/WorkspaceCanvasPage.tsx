import { useRef, type MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAuth } from '@/features/auth/stores/authStore';
import {
  WorkspaceBreadcrumbs,
  workspaceBreadcrumbs,
} from '@/features/workspace/components/WorkspaceBreadcrumbs';
import { useWorkspaceQuery } from '@/features/workspace/hooks/useWorkspacesQuery';
import {
  ConnectionBanner,
  ConnectionStatus,
} from '@/realtime/components/ConnectionStatus';
import { LiveCursors } from '@/realtime/components/LiveCursors';
import { PresenceAvatarStack } from '@/realtime/components/PresenceAvatarStack';
import { ReconnectOverlay } from '@/realtime/components/ReconnectOverlay';
import { usePresenceCursor } from '@/realtime/hooks/usePresenceCursor';
import { useWorkspaceRoom } from '@/realtime/hooks/useWorkspaceRoom';
import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/Spinner';
import { ROUTES } from '@/shared/lib/constants';

export function WorkspaceCanvasPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { user } = useAuth();
  const canvasRef = useRef<HTMLDivElement>(null);

  const {
    data: workspace,
    isLoading,
    isError,
  } = useWorkspaceQuery(workspaceId);

  useWorkspaceRoom(workspaceId);
  const { emitCursor } = usePresenceCursor({ workspaceId, enabled: true });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    emitCursor(event.clientX - rect.left, event.clientY - rect.top);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Spinner label="Loading workspace" />
      </div>
    );
  }

  if (isError || !workspace) {
    return (
      <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-text-primary text-xl font-semibold">
          Workspace not found
        </h1>
        <p className="text-text-muted mt-2 text-sm">
          This workspace may have been removed or you do not have access.
        </p>
        <Link to={ROUTES.workspaces} className="mt-6">
          <Button variant="secondary">Back to workspaces</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <ConnectionBanner />

      <div className="border-border bg-surface flex flex-col gap-3 border-b px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <WorkspaceBreadcrumbs items={workspaceBreadcrumbs(workspace.name)} />

        <div className="flex flex-wrap items-center gap-3">
          <PresenceAvatarStack
            workspaceId={workspace.id}
            currentUserId={user?.id}
            currentUserName={user?.name}
          />
          <ConnectionStatus />
          <Link to={ROUTES.workspaceSettings(workspace.id)}>
            <Button size="sm" variant="secondary">
              Settings
            </Button>
          </Link>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="bg-canvas relative flex flex-1 items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <ReconnectOverlay />
        <LiveCursors workspaceId={workspace.id} currentUserId={user?.id} />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--cw-border) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="border-border bg-surface relative z-[1] max-w-md rounded-xl border p-8 text-center shadow-lg">
          <p className="text-text-primary text-sm font-medium">
            Collaborative canvas
          </p>
          <p className="text-text-muted mt-2 text-sm">
            Open this workspace in another tab to see live presence and cursors.
            Pan, zoom, and blocks arrive in Phase 4–5.
          </p>
          {workspace.description ? (
            <p className="text-text-muted mt-3 text-xs">
              {workspace.description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
