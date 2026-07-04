import type {
  CanvasPoint,
  CanvasRect,
  ViewportState,
} from '@/features/canvas/types/canvas.types';
import {
  CANVAS_ZOOM_MAX,
  CANVAS_ZOOM_MIN,
} from '@/features/canvas/types/canvas.types';

export function clampZoom(zoom: number): number {
  return Math.min(CANVAS_ZOOM_MAX, Math.max(CANVAS_ZOOM_MIN, zoom));
}

export function screenToWorld(
  screen: CanvasPoint,
  viewport: ViewportState,
): CanvasPoint {
  return {
    x: (screen.x - viewport.x) / viewport.zoom,
    y: (screen.y - viewport.y) / viewport.zoom,
  };
}

export function worldToScreen(
  world: CanvasPoint,
  viewport: ViewportState,
): CanvasPoint {
  return {
    x: world.x * viewport.zoom + viewport.x,
    y: world.y * viewport.zoom + viewport.y,
  };
}

export function zoomAtPoint(
  viewport: ViewportState,
  screenPoint: CanvasPoint,
  nextZoom: number,
): ViewportState {
  const clamped = clampZoom(nextZoom);
  const worldPoint = screenToWorld(screenPoint, viewport);

  return {
    zoom: clamped,
    x: screenPoint.x - worldPoint.x * clamped,
    y: screenPoint.y - worldPoint.y * clamped,
  };
}

export function panViewport(
  viewport: ViewportState,
  delta: CanvasPoint,
): ViewportState {
  return {
    ...viewport,
    x: viewport.x + delta.x,
    y: viewport.y + delta.y,
  };
}

export function fitViewportToBounds(
  _viewport: ViewportState,
  bounds: CanvasRect,
  canvasSize: { width: number; height: number },
  padding = 64,
): ViewportState {
  const availableWidth = canvasSize.width - padding * 2;
  const availableHeight = canvasSize.height - padding * 2;

  const scaleX = availableWidth / bounds.width;
  const scaleY = availableHeight / bounds.height;
  const zoom = clampZoom(Math.min(scaleX, scaleY, 1));

  const x = (canvasSize.width - bounds.width * zoom) / 2 - bounds.x * zoom;
  const y = (canvasSize.height - bounds.height * zoom) / 2 - bounds.y * zoom;

  return { x, y, zoom };
}

export function getObjectsBounds(
  objects: Array<{ x: number; y: number; width: number; height: number }>,
): CanvasRect | null {
  if (objects.length === 0) return null;

  const xs = objects.map((o) => [o.x, o.x + o.width]).flat();
  const ys = objects.map((o) => [o.y, o.y + o.height]).flat();

  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
