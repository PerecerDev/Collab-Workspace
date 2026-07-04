import { beforeEach, describe, expect, it } from 'vitest';

import {
  workspaceService,
  WorkspaceServiceError,
} from '@/features/workspace/services/workspaceService';
import { workspaceRepository } from '@/features/workspace/services/workspaceRepository';

const OWNER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
const MEMBER_ID = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
const OUTSIDER_ID = 'c3d4e5f6-a7b8-9012-cdef-123456789012';

describe('workspaceService', () => {
  beforeEach(() => {
    workspaceRepository.reset();
  });

  it('lists workspaces for members only', async () => {
    const workspaces = await workspaceService.listWorkspaces(OWNER_ID);
    expect(workspaces.length).toBeGreaterThan(0);
    expect(workspaces.every((ws) => ws.memberIds.includes(OWNER_ID))).toBe(
      true,
    );
  });

  it('creates a workspace with the owner as sole member', async () => {
    const workspace = await workspaceService.createWorkspace(
      {
        name: 'Engineering Sync',
        description: 'Weekly planning',
      },
      OWNER_ID,
    );

    expect(workspace.name).toBe('Engineering Sync');
    expect(workspace.ownerId).toBe(OWNER_ID);
    expect(workspace.memberIds).toEqual([OWNER_ID]);

    const listed = await workspaceService.listWorkspaces(OWNER_ID);
    expect(listed.some((item) => item.id === workspace.id)).toBe(true);
  });

  it('updates workspace details for the owner', async () => {
    const created = await workspaceService.createWorkspace(
      { name: 'Draft Board' },
      OWNER_ID,
    );

    const updated = await workspaceService.updateWorkspace(
      created.id,
      { name: 'Draft Board v2', description: 'Updated scope' },
      OWNER_ID,
    );

    expect(updated.name).toBe('Draft Board v2');
    expect(updated.description).toBe('Updated scope');
  });

  it('prevents non-owners from updating a workspace', async () => {
    const created = await workspaceService.createWorkspace(
      { name: 'Protected Space' },
      OWNER_ID,
    );

    await expect(
      workspaceService.updateWorkspace(
        created.id,
        { name: 'Hijacked' },
        OUTSIDER_ID,
      ),
    ).rejects.toSatisfy(
      (error: unknown) =>
        error instanceof WorkspaceServiceError && error.code === 'FORBIDDEN',
    );
  });

  it('adds and removes members', async () => {
    const created = await workspaceService.createWorkspace(
      { name: 'Team Hub' },
      OWNER_ID,
    );

    const withMember = await workspaceService.addMember(
      created.id,
      { email: 'sam@collab.dev' },
      OWNER_ID,
    );

    expect(withMember.memberIds).toContain(MEMBER_ID);

    const reduced = await workspaceService.removeMember(
      created.id,
      MEMBER_ID,
      OWNER_ID,
    );

    expect(reduced.memberIds).not.toContain(MEMBER_ID);
  });

  it('deletes a workspace for the owner', async () => {
    const created = await workspaceService.createWorkspace(
      { name: 'Temporary Space' },
      OWNER_ID,
    );

    await workspaceService.deleteWorkspace(created.id, OWNER_ID);

    await expect(
      workspaceService.getWorkspace(created.id, OWNER_ID),
    ).rejects.toSatisfy(
      (error: unknown) =>
        error instanceof WorkspaceServiceError && error.code === 'NOT_FOUND',
    );
  });
});
