import type { TaskBlockStatus } from '@/shared/types/domain';

export type CanvasTool =
  'select' | 'hand' | 'sticky' | 'text' | 'rectangle' | 'ellipse' | 'task';

export type ShapeKind = 'rectangle' | 'ellipse';

export interface ViewportState {
  x: number;
  y: number;
  zoom: number;
}

export interface CanvasPoint {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}

export interface CanvasRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CanvasObjectNode {
  id: string;
  workspaceId: string;
  type: 'sticky_note' | 'shape' | 'text' | 'task';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  content: string;
  color: string;
  shapeKind?: ShapeKind;
  taskStatus?: TaskBlockStatus;
  assigneeId?: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
}

export const CANVAS_ZOOM_MIN = 0.25;
export const CANVAS_ZOOM_MAX = 2;
export const CANVAS_ZOOM_STEP = 0.1;
export const CANVAS_ZOOM_DEFAULT = 1;

export const STICKY_NOTE_COLORS = [
  '#fef08a',
  '#fbcfe8',
  '#bfdbfe',
  '#bbf7d0',
  '#fed7aa',
] as const;

export const SHAPE_FILL_COLORS = [
  '#e4e4e7',
  '#bfdbfe',
  '#bbf7d0',
  '#fbcfe8',
  '#fed7aa',
] as const;

export const CANVAS_TOOL_LABELS: Record<CanvasTool, string> = {
  select: 'Select',
  hand: 'Hand',
  sticky: 'Sticky note',
  text: 'Text',
  rectangle: 'Rectangle',
  ellipse: 'Ellipse',
  task: 'Task',
};

export const CANVAS_TOOL_SHORTCUTS: Record<CanvasTool, string> = {
  select: 'V',
  hand: 'H',
  sticky: 'N',
  text: 'T',
  rectangle: 'R',
  ellipse: 'O',
  task: 'K',
};
