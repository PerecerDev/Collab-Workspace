import { blockRegistry } from '@/features/blocks/registry/blockRegistry';
import type { CreateBlockOptions } from '@/features/blocks/types/block.types';
import type { BlockPlacementTool } from '@/features/blocks/types/block.types';
import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';

interface CreateBlockNodeInput {
  workspaceId: string;
  userId: string;
  x: number;
  y: number;
  zIndex: number;
  tool: BlockPlacementTool;
  options?: CreateBlockOptions;
}

export function createBlockNode({
  workspaceId,
  userId,
  x,
  y,
  zIndex,
  tool,
  options,
}: CreateBlockNodeInput): CanvasObjectNode {
  const definition = blockRegistry.getByTool(tool);
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    workspaceId,
    type: definition.type,
    x: x - definition.defaultSize.width / 2,
    y: y - definition.defaultSize.height / 2,
    width: definition.defaultSize.width,
    height: definition.defaultSize.height,
    rotation: 0,
    zIndex,
    content: '',
    color: options?.color ?? definition.defaultColor,
    shapeKind: options?.shapeKind ?? definition.shapeKind,
    createdBy: userId,
    updatedBy: userId,
    updatedAt: now,
  };
}
