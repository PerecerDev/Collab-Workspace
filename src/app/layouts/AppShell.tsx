import { Link, NavLink, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth/stores/authStore';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Button } from '@/shared/components/ui/Button';
import { APP_NAME, ROUTES } from '@/shared/lib/constants';
import { cn } from '@/shared/lib/cn';

const navItems = [
  { to: ROUTES.workspaces, label: 'Workspaces', protected: true },
  { to: ROUTES.settings, label: 'Settings', protected: true },
];

export function AppShell() {
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <header className="border-border bg-surface/80 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 lg:px-6">
          <Link
            to={ROUTES.home}
            className="text-text-primary flex items-center gap-2 font-semibold"
          >
            <span
              className="bg-accent flex size-8 items-center justify-center rounded-lg text-sm text-white"
              aria-hidden="true"
            >
              CW
            </span>
            <span className="hidden sm:inline">{APP_NAME}</span>
          </Link>

          {isAuthenticated ? (
            <nav className="flex items-center gap-1" aria-label="Main">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent-muted text-accent'
                        : 'text-text-muted hover:bg-surface-elevated hover:text-text-primary',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          ) : null}

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated && user ? (
              <>
                <Avatar name={user.name} src={user.avatarUrl} size="sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    void signOut();
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Link to={ROUTES.login}>
                <Button size="sm">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
