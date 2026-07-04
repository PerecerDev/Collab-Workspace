import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/Button';
import { ROUTES } from '@/shared/lib/constants';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-accent text-sm font-medium">404</p>
      <h1 className="text-text-primary mt-2 text-2xl font-semibold">
        Page not found
      </h1>
      <p className="text-text-muted mt-2 text-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to={ROUTES.home} className="mt-6">
        <Button variant="secondary">Back to home</Button>
      </Link>
    </div>
  );
}
