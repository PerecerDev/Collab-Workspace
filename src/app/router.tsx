import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AuthGuard, GuestGuard } from '@/features/auth/components/AuthGuard';
import { AppShell } from '@/app/layouts/AppShell';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { ROUTES } from '@/shared/lib/constants';

const HomePage = lazy(() =>
  import('@/features/home/pages/HomePage').then((m) => ({
    default: m.HomePage,
  })),
);

const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({
    default: m.LoginPage,
  })),
);

const WorkspacesPage = lazy(() =>
  import('@/features/workspace/pages/WorkspacesPage').then((m) => ({
    default: m.WorkspacesPage,
  })),
);

const WorkspaceCanvasPage = lazy(() =>
  import('@/features/workspace/pages/WorkspaceCanvasPage').then((m) => ({
    default: m.WorkspaceCanvasPage,
  })),
);

const SettingsPage = lazy(() =>
  import('@/features/settings/pages/SettingsPage').then((m) => ({
    default: m.SettingsPage,
  })),
);

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <GuestGuard />,
        children: [{ path: 'login', element: <LoginPage /> }],
      },
      {
        element: <AuthGuard />,
        children: [
          { path: 'workspaces', element: <WorkspacesPage /> },
          { path: 'workspace/:workspaceId', element: <WorkspaceCanvasPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
