import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useEffect, type ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/router';
import { Spinner } from '@/shared/components/ui/Spinner';
import { queryClient } from '@/shared/lib/queryClient';
import { initializeTheme } from '@/shared/stores/themeStore';

function PageLoader() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <Spinner label="Loading page" />
    </div>
  );
}

function ThemeInitializer({ children }: { children: ReactNode }) {
  useEffect(() => initializeTheme(), []);
  return children;
}

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeInitializer>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeInitializer>
      {import.meta.env.DEV ? (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      ) : null}
    </QueryClientProvider>
  );
}
