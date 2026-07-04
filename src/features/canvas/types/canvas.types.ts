export type CanvasTool = 'select' | 'hand' | 'sticky';

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
  type: 'sticky_note' | 'shape' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  content: string;
  color: string;
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

export const CANVAS_TOOL_LABELS: Record<CanvasTool, string> = {
  select: 'Select',
  hand: 'Hand',
  sticky: 'Sticky note',
};

export const CANVAS_TOOL_SHORTCUTS: Record<CanvasTool, string> = {
  select: 'V',
  hand: 'H',
  sticky: 'N',
};
