import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AppShell } from '@/app/layouts/AppShell';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { ROUTES } from '@/shared/lib/constants';

const HomePage = lazy(() =>
  import('@/features/home/pages/HomePage').then((m) => ({
    default: m.HomePage,
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
      { path: 'workspaces', element: <WorkspacesPage /> },
      { path: 'workspace/:workspaceId', element: <WorkspaceCanvasPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
