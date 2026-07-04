import {
  STICKY_NOTE_COLORS,
  SHAPE_FILL_COLORS,
} from '@/features/canvas/types/canvas.types';
import type {
  BlockDefinition,
  BlockPlacementTool,
  BlockTypeId,
  CreateBlockOptions,
} from '@/features/blocks/types/block.types';

const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: 'sticky_note',
    label: 'Sticky note',
    shortcut: 'N',
    tool: 'sticky',
    defaultSize: { width: 200, height: 160 },
    defaultColor: STICKY_NOTE_COLORS[0],
    placeholder: 'Write a note…',
  },
  {
    type: 'text',
    label: 'Text',
    shortcut: 'T',
    tool: 'text',
    defaultSize: { width: 280, height: 80 },
    defaultColor: 'transparent',
    placeholder: 'Type something…',
  },
  {
    type: 'shape',
    label: 'Rectangle',
    shortcut: 'R',
    tool: 'rectangle',
    defaultSize: { width: 160, height: 120 },
    defaultColor: SHAPE_FILL_COLORS[0],
    shapeKind: 'rectangle',
  },
  {
    type: 'shape',
    label: 'Ellipse',
    shortcut: 'O',
    tool: 'ellipse',
    defaultSize: { width: 160, height: 120 },
    defaultColor: SHAPE_FILL_COLORS[1],
    shapeKind: 'ellipse',
  },
  {
    type: 'task',
    label: 'Task',
    shortcut: 'K',
    tool: 'task',
    defaultSize: { width: 240, height: 140 },
    defaultColor: '#ffffff',
    placeholder: 'Task title…',
  },
];

const byTool = new Map<BlockPlacementTool, BlockDefinition>(
  BLOCK_DEFINITIONS.map((definition) => [definition.tool, definition]),
);

const byType = new Map<BlockTypeId, BlockDefinition[]>(
  BLOCK_DEFINITIONS.reduce<Map<BlockTypeId, BlockDefinition[]>>(
    (acc, definition) => {
      const existing = acc.get(definition.type) ?? [];
      acc.set(definition.type, [...existing, definition]);
      return acc;
    },
    new Map(),
  ),
);

export const blockRegistry = {
  all(): BlockDefinition[] {
    return BLOCK_DEFINITIONS;
  },

  placementTools(): BlockPlacementTool[] {
    return BLOCK_DEFINITIONS.map((definition) => definition.tool);
  },

  getByTool(tool: BlockPlacementTool): BlockDefinition {
    const definition = byTool.get(tool);
    if (!definition) throw new Error(`Unknown block tool: ${tool}`);
    return definition;
  },

  getByType(type: BlockTypeId, options?: CreateBlockOptions): BlockDefinition {
    const definitions = byType.get(type) ?? [];
    if (options?.shapeKind) {
      const match = definitions.find(
        (definition) => definition.shapeKind === options.shapeKind,
      );
      if (match) return match;
    }
    const fallback = definitions[0];
    if (!fallback) throw new Error(`Unknown block type: ${type}`);
    return fallback;
  },
};
