import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Badge } from '@/shared/components/ui/Badge';

export function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 lg:px-6">
      <h1 className="text-text-primary text-2xl font-semibold">Settings</h1>
      <p className="text-text-muted mt-1 text-sm">
        Customize your Collab Workspace experience.
      </p>

      <section className="mt-8 space-y-6">
        <div className="border-border bg-surface rounded-xl border p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-text-primary text-sm font-medium">
                Appearance
              </h2>
              <p className="text-text-muted mt-1 text-sm">
                Switch between light, dark, and system theme.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div className="border-border bg-surface rounded-xl border p-5">
          <h2 className="text-text-primary text-sm font-medium">
            Keyboard shortcuts
          </h2>
          <p className="text-text-muted mt-1 text-sm">
            Command palette and shortcuts arrive in Phase 8.
          </p>
          <Badge className="mt-3" variant="default">
            Coming soon
          </Badge>
        </div>
      </section>
    </div>
  );
}
