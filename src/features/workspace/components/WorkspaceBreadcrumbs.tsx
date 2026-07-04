import { Link } from 'react-router-dom';

import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/lib/constants';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface WorkspaceBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function WorkspaceBreadcrumbs({
  items,
  className,
}: WorkspaceBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2', className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {index > 0 ? (
              <span className="text-text-muted text-sm" aria-hidden="true">
                /
              </span>
            ) : null}
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="text-text-muted hover:text-text-primary text-sm transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'text-sm',
                  isLast ? 'text-text-primary font-medium' : 'text-text-muted',
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function workspaceBreadcrumbs(workspaceName: string) {
  return [
    { label: 'Workspaces', href: ROUTES.workspaces },
    { label: workspaceName },
  ];
}
