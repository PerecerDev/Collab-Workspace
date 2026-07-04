import { findUserByEmail } from '@/shared/mocks/data';
import { delay } from '@/shared/lib/storage';
import type { User, Workspace, WorkspaceMember } from '@/shared/types/domain';
import {
  addMemberSchema,
  createWorkspaceSchema,
  updateWorkspaceSchema,
  workspaceSchema,
  type AddMemberFormValues,
  type CreateWorkspaceFormValues,
  type UpdateWorkspaceFormValues,
} from '@/shared/types/schemas/workspace.schema';

import { createWorkspaceId } from '@/features/workspace/utils/workspaceId';
import { workspaceRepository } from '@/features/workspace/services/workspaceRepository';

export class WorkspaceServiceError extends Error {
  constructor(
    message: string,
    readonly code:
      | 'NOT_FOUND'
      | 'FORBIDDEN'
      | 'VALIDATION'
      | 'MEMBER_EXISTS'
      | 'USER_NOT_FOUND'
      | 'OWNER_PROTECTED',
  ) {
    super(message);
    this.name = 'WorkspaceServiceError';
  }
}

function assertMember(workspace: Workspace, userId: string): void {
  if (!workspace.memberIds.includes(userId)) {
    throw new WorkspaceServiceError(
      'You do not have access to this workspace.',
      'FORBIDDEN',
    );
  }
}

function assertOwner(workspace: Workspace, userId: string): void {
  if (workspace.ownerId !== userId) {
    throw new WorkspaceServiceError(
      'Only the workspace owner can perform this action.',
      'FORBIDDEN',
    );
  }
}

function touch(workspace: Workspace): Workspace {
  return {
    ...workspace,
    updatedAt: new Date().toISOString(),
  };
}

function findWorkspaceOrThrow(id: string): Workspace {
  const workspace = workspaceRepository
    .readAll()
    .find((item) => item.id === id);

  if (!workspace) {
    throw new WorkspaceServiceError('Workspace not found.', 'NOT_FOUND');
  }

  return workspace;
}

function replaceWorkspace(updated: Workspace): Workspace {
  const workspaces = workspaceRepository.readAll();
  const index = workspaces.findIndex((item) => item.id === updated.id);

  if (index === -1) {
    throw new WorkspaceServiceError('Workspace not found.', 'NOT_FOUND');
  }

  const next = [...workspaces];
  next[index] = workspaceSchema.parse(updated);
  workspaceRepository.writeAll(next);
  return next[index];
}

export const workspaceService = {
  async listWorkspaces(userId: string): Promise<Workspace[]> {
    await delay(200);
    return workspaceRepository
      .readAll()
      .filter((workspace) => workspace.memberIds.includes(userId))
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  },

  async getWorkspace(id: string, userId: string): Promise<Workspace> {
    await delay(150);
    const workspace = findWorkspaceOrThrow(id);
    assertMember(workspace, userId);
    return workspaceSchema.parse(workspace);
  },

  async createWorkspace(
    input: CreateWorkspaceFormValues,
    ownerId: string,
  ): Promise<Workspace> {
    await delay(300);
    const validated = createWorkspaceSchema.parse(input);
    const now = new Date().toISOString();

    const workspace: Workspace = {
      id: createWorkspaceId(validated.name),
      name: validated.name.trim(),
      description: validated.description?.trim() || undefined,
      ownerId,
      memberIds: [ownerId],
      createdAt: now,
      updatedAt: now,
    };

    const workspaces = workspaceRepository.readAll();
    const parsed = workspaceSchema.parse(workspace);
    workspaceRepository.writeAll([parsed, ...workspaces]);
    return parsed;
  },

  async updateWorkspace(
    id: string,
    input: UpdateWorkspaceFormValues,
    userId: string,
  ): Promise<Workspace> {
    await delay(250);
    const validated = updateWorkspaceSchema.parse(input);
    const workspace = findWorkspaceOrThrow(id);
    assertOwner(workspace, userId);

    return replaceWorkspace(
      touch({
        ...workspace,
        name: validated.name.trim(),
        description: validated.description?.trim() || undefined,
      }),
    );
  },

  async deleteWorkspace(id: string, userId: string): Promise<void> {
    await delay(250);
    const workspace = findWorkspaceOrThrow(id);
    assertOwner(workspace, userId);

    const next = workspaceRepository.readAll().filter((item) => item.id !== id);
    workspaceRepository.writeAll(next);
  },

  async addMember(
    workspaceId: string,
    input: AddMemberFormValues,
    actorId: string,
  ): Promise<Workspace> {
    await delay(250);
    const validated = addMemberSchema.parse(input);
    const workspace = findWorkspaceOrThrow(workspaceId);
    assertOwner(workspace, actorId);

    const user = findUserByEmail(validated.email);
    if (!user) {
      throw new WorkspaceServiceError(
        'No user found with that email.',
        'USER_NOT_FOUND',
      );
    }

    if (workspace.memberIds.includes(user.id)) {
      throw new WorkspaceServiceError(
        'This user is already a member.',
        'MEMBER_EXISTS',
      );
    }

    return replaceWorkspace(
      touch({
        ...workspace,
        memberIds: [...workspace.memberIds, user.id],
      }),
    );
  },

  async removeMember(
    workspaceId: string,
    memberId: string,
    actorId: string,
  ): Promise<Workspace> {
    await delay(250);
    const workspace = findWorkspaceOrThrow(workspaceId);
    assertOwner(workspace, actorId);

    if (memberId === workspace.ownerId) {
      throw new WorkspaceServiceError(
        'The workspace owner cannot be removed.',
        'OWNER_PROTECTED',
      );
    }

    if (!workspace.memberIds.includes(memberId)) {
      throw new WorkspaceServiceError('Member not found.', 'NOT_FOUND');
    }

    return replaceWorkspace(
      touch({
        ...workspace,
        memberIds: workspace.memberIds.filter((id) => id !== memberId),
      }),
    );
  },

  async listMembers(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceMember[]> {
    await delay(150);
    const workspace = findWorkspaceOrThrow(workspaceId);
    assertMember(workspace, userId);

    return workspace.memberIds.map((memberId) => ({
      workspaceId: workspace.id,
      userId: memberId,
      role: memberId === workspace.ownerId ? 'owner' : 'editor',
      joinedAt: workspace.createdAt,
    }));
  },

  async resolveMemberUsers(
    workspaceId: string,
    userId: string,
  ): Promise<User[]> {
    const members = await this.listMembers(workspaceId, userId);
    const { MOCK_USERS } = await import('@/shared/mocks/data');

    return members
      .map((member) => MOCK_USERS.find((user) => user.id === member.userId))
      .filter((user): user is User => Boolean(user));
  },
};
