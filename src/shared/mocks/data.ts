import type { User, Workspace } from '@/shared/types/domain';

export const MOCK_USERS: User[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    email: 'alex@collab.dev',
    name: 'Alex Parker',
    avatarUrl: undefined,
    createdAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    email: 'sam@collab.dev',
    name: 'Sam Rivera',
    createdAt: '2026-02-01T14:30:00.000Z',
  },
];

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: 'ws-product-roadmap',
    name: 'Product Roadmap',
    description: 'Q3 planning and feature prioritization',
    ownerId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    memberIds: [
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    ],
    createdAt: '2026-03-01T09:00:00.000Z',
    updatedAt: '2026-07-03T16:20:00.000Z',
  },
  {
    id: 'ws-design-system',
    name: 'Design System',
    description: 'Component specs and token definitions',
    ownerId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    memberIds: [
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    ],
    createdAt: '2026-03-10T11:00:00.000Z',
    updatedAt: '2026-07-02T10:15:00.000Z',
  },
  {
    id: 'ws-sprint-board',
    name: 'Sprint Board',
    description: 'Current sprint tasks and blockers',
    ownerId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    memberIds: [
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    ],
    createdAt: '2026-04-05T08:00:00.000Z',
    updatedAt: '2026-06-30T18:45:00.000Z',
  },
];

export function findUserByEmail(email: string): User | undefined {
  return MOCK_USERS.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

export function findWorkspaceById(id: string): Workspace | undefined {
  return MOCK_WORKSPACES.find((workspace) => workspace.id === id);
}
