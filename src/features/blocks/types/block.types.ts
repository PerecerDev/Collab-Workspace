import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';

export type BlockTypeId = CanvasObjectNode['type'];

export type ShapeKind = 'rectangle' | 'ellipse';

export type BlockPlacementTool = 'sticky' | 'text' | 'rectangle' | 'ellipse';

export interface BlockDefinition {
  type: BlockTypeId;
  label: string;
  shortcut: string;
  tool: BlockPlacementTool;
  defaultSize: { width: number; height: number };
  defaultColor: string;
  shapeKind?: ShapeKind;
  placeholder?: string;
}

export interface CreateBlockOptions {
  shapeKind?: ShapeKind;
  color?: string;
}
