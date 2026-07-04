import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Button } from '@/shared/components/ui/Button';
import { APP_NAME, ROUTES } from '@/shared/lib/constants';

export function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-16 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <p className="text-accent text-sm font-medium">
            Real-time collaboration
          </p>
          <h1 className="text-text-primary max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Work together on shared workspaces, instantly.
          </h1>
          <p className="text-text-muted max-w-xl text-lg">
            {APP_NAME} is a collaborative canvas where teams create, sync, and
            ship ideas in real time — built with production-grade frontend
            architecture.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to={ROUTES.workspaces}>
            <Button>Open workspaces</Button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="secondary">View on GitHub</Button>
          </a>
        </div>

        <dl className="grid gap-4 pt-8 sm:grid-cols-3">
          {[
            { label: 'Presence', value: 'Live cursors & avatars' },
            { label: 'Sync', value: 'Optimistic updates' },
            { label: 'Canvas', value: 'Spatial collaboration' },
          ].map((item) => (
            <div
              key={item.label}
              className="border-border bg-surface rounded-xl border p-4"
            >
              <dt className="text-text-primary text-sm font-medium">
                {item.label}
              </dt>
              <dd className="text-text-muted mt-1 text-sm">{item.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </div>
  );
}
