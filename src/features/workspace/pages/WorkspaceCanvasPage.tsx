import { Link, useParams } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { ROUTES } from '@/shared/lib/constants';

export function WorkspaceCanvasPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <div className="border-border bg-surface flex items-center justify-between border-b px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.workspaces}
            className="text-text-muted hover:text-text-primary text-sm"
          >
            ← Workspaces
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-text-primary text-sm font-medium">
            {workspaceId?.replace(/^ws-/, '').replace(/-/g, ' ') ?? 'Workspace'}
          </h1>
          <Badge variant="default">Canvas preview</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent">Real-time: Phase 3</Badge>
          <Button size="sm" variant="secondary" disabled>
            Share
          </Button>
        </div>
      </div>

      <div className="bg-canvas relative flex flex-1 items-center justify-center">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--cw-border) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        <div className="border-border bg-surface relative z-10 max-w-md rounded-xl border p-8 text-center shadow-lg">
          <p className="text-text-primary text-sm font-medium">
            Collaborative canvas
          </p>
          <p className="text-text-muted mt-2 text-sm">
            Pan, zoom, sticky notes, and live cursors arrive in upcoming phases.
            Workspace ID:{' '}
            <code className="bg-surface-elevated rounded px-1.5 py-0.5 text-xs">
              {workspaceId}
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
