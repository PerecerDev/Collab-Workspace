import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { ROUTES } from '@/shared/lib/constants';

const mockWorkspaces = [
  {
    id: 'ws-product-roadmap',
    name: 'Product Roadmap',
    description: 'Q3 planning and feature prioritization',
    memberCount: 4,
    updatedAt: '2 hours ago',
  },
  {
    id: 'ws-design-system',
    name: 'Design System',
    description: 'Component specs and token definitions',
    memberCount: 3,
    updatedAt: 'Yesterday',
  },
  {
    id: 'ws-sprint-board',
    name: 'Sprint Board',
    description: 'Current sprint tasks and blockers',
    memberCount: 6,
    updatedAt: '3 days ago',
  },
];

export function WorkspacesPage() {
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

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockWorkspaces.map((workspace) => (
          <li key={workspace.id}>
            <Link
              to={ROUTES.workspace(workspace.id)}
              className="group border-border bg-surface hover:border-accent/40 focus-visible:ring-accent block h-full rounded-xl border p-5 transition-all hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <h2 className="text-text-primary group-hover:text-accent font-medium">
                  {workspace.name}
                </h2>
                <Badge variant="accent">{workspace.memberCount} members</Badge>
              </div>
              <p className="text-text-muted text-sm">{workspace.description}</p>
              <p className="text-text-muted mt-4 text-xs">
                Updated {workspace.updatedAt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
