import { delay } from '@/shared/lib/storage';
import { MOCK_WORKSPACES } from '@/shared/mocks/data';
import type { Workspace } from '@/shared/types/domain';
import { workspaceSchema } from '@/shared/types/schemas/auth.schema';

export const workspaceService = {
  async listWorkspaces(): Promise<Workspace[]> {
    await delay(200);
    return workspaceSchema.array().parse(MOCK_WORKSPACES);
  },

  async getWorkspace(id: string): Promise<Workspace | null> {
    await delay(150);
    const workspace = MOCK_WORKSPACES.find((item) => item.id === id);
    if (!workspace) return null;
    return workspaceSchema.parse(workspace);
  },
};
