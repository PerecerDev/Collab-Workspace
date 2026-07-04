import { NavLink } from 'react-router-dom';

import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/lib/constants';

const items = [
  { to: ROUTES.workspaces, label: 'All workspaces', end: false },
  { to: ROUTES.workspacesNew, label: 'Create workspace', end: true },
];

export function WorkspaceSidebar() {
  return (
    <aside className="border-border bg-surface hidden w-56 shrink-0 border-r lg:block">
      <div className="sticky top-14 px-3 py-6">
        <p className="text-text-muted mb-3 px-2 text-xs font-medium tracking-wide uppercase">
          Workspaces
        </p>
        <nav className="space-y-1" aria-label="Workspace navigation">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'block rounded-md px-2 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-accent-muted text-accent font-medium'
                    : 'text-text-muted hover:bg-surface-elevated hover:text-text-primary',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
