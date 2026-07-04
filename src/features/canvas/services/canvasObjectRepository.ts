import { storage } from '@/shared/lib/storage';

import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';
import { STICKY_NOTE_COLORS } from '@/features/canvas/types/canvas.types';

const objectsKey = (workspaceId: string) =>
  `collab-canvas-objects:${workspaceId}`;

function createSeedObjects(
  workspaceId: string,
  userId: string,
): CanvasObjectNode[] {
  const now = new Date().toISOString();

  return [
    {
      id: `${workspaceId}-sticky-1`,
      workspaceId,
      type: 'sticky_note',
      x: 120,
      y: 100,
      width: 200,
      height: 160,
      rotation: 0,
      zIndex: 1,
      content: 'Welcome to Collab Workspace',
      color: STICKY_NOTE_COLORS[0],
      createdBy: userId,
      updatedAt: now,
    },
    {
      id: `${workspaceId}-sticky-2`,
      workspaceId,
      type: 'sticky_note',
      x: 380,
      y: 180,
      width: 200,
      height: 160,
      rotation: 0,
      zIndex: 2,
      content: 'Drag, pan, and zoom the canvas',
      color: STICKY_NOTE_COLORS[2],
      createdBy: userId,
      updatedAt: now,
    },
    {
      id: `${workspaceId}-shape-1`,
      workspaceId,
      type: 'shape',
      x: 640,
      y: 120,
      width: 160,
      height: 120,
      rotation: 0,
      zIndex: 3,
      content: '',
      color: '#e4e4e7',
      createdBy: userId,
      updatedAt: now,
    },
  ];
}

export const canvasObjectRepository = {
  read(workspaceId: string, userId: string): CanvasObjectNode[] {
    const stored = storage.get<CanvasObjectNode[]>(objectsKey(workspaceId));
    if (stored && stored.length > 0) return stored;

    const seed = createSeedObjects(workspaceId, userId);
    storage.set(objectsKey(workspaceId), seed);
    return seed;
  },

  write(workspaceId: string, objects: CanvasObjectNode[]): CanvasObjectNode[] {
    storage.set(objectsKey(workspaceId), objects);
    return objects;
  },
};
