import { MOCK_WORKSPACES } from '@/shared/mocks/data';
import { storage } from '@/shared/lib/storage';
import type { Workspace } from '@/shared/types/domain';
import { workspaceSchema } from '@/shared/types/schemas/workspace.schema';

const WORKSPACES_STORAGE_KEY = 'collab-workspace-workspaces';

function parseWorkspaces(raw: Workspace[]): Workspace[] {
  return workspaceSchema.array().parse(raw);
}

export const workspaceRepository = {
  readAll(): Workspace[] {
    const stored = storage.get<Workspace[]>(WORKSPACES_STORAGE_KEY);
    if (stored) {
      try {
        return parseWorkspaces(stored);
      } catch {
        storage.remove(WORKSPACES_STORAGE_KEY);
      }
    }

    storage.set(WORKSPACES_STORAGE_KEY, MOCK_WORKSPACES);
    return parseWorkspaces(MOCK_WORKSPACES);
  },

  writeAll(workspaces: Workspace[]): Workspace[] {
    const parsed = parseWorkspaces(workspaces);
    storage.set(WORKSPACES_STORAGE_KEY, parsed);
    return parsed;
  },

  reset(): void {
    storage.remove(WORKSPACES_STORAGE_KEY);
  },
};
