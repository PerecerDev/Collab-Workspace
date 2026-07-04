export const APP_NAME = 'Collab Workspace';

export const ROUTES = {
  home: '/',
  login: '/login',
  workspaces: '/workspaces',
  workspacesNew: '/workspaces/new',
  workspace: (id: string) => `/workspace/${id}`,
  workspaceSettings: (id: string) => `/workspace/${id}/settings`,
  settings: '/settings',
} as const;

export const PRESENCE_COLORS = [
  'presence-1',
  'presence-2',
  'presence-3',
  'presence-4',
  'presence-5',
] as const;
