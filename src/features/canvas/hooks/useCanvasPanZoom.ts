import { useCallback, useRef } from 'react';

import {
  useCanvasSelectionStore,
  useCanvasToolStore,
  useCanvasViewportStore,
} from '@/features/canvas/stores/canvasStores';
import { screenToWorld } from '@/features/canvas/utils/viewportMath';

interface UseCanvasPanZoomOptions {
  onCanvasClick?: (worldX: number, worldY: number) => void;
}

export function useCanvasPanZoom(_options: UseCanvasPanZoomOptions = {}) {
  const viewport = useCanvasViewportStore((state) => state.viewport);
  const panBy = useCanvasViewportStore((state) => state.panBy);
  const zoomTo = useCanvasViewportStore((state) => state.zoomTo);
  const setIsPanning = useCanvasViewportStore((state) => state.setIsPanning);
  const getEffectiveTool = useCanvasToolStore(
    (state) => state.getEffectiveTool,
  );

  const panStart = useRef<{ x: number; y: number } | null>(null);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      if (event.ctrlKey || event.metaKey) {
        const direction = event.deltaY > 0 ? -0.08 : 0.08;
        zoomTo(viewport.zoom + direction, point);
        return;
      }

      panBy(-event.deltaX, -event.deltaY);
    },
    [panBy, viewport.zoom, zoomTo],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const tool = getEffectiveTool();

      if (tool === 'hand' || event.button === 1) {
        event.currentTarget.setPointerCapture(event.pointerId);
        panStart.current = { x: event.clientX, y: event.clientY };
        setIsPanning(true);
      }
    },
    [getEffectiveTool, setIsPanning],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!panStart.current) return;

      const deltaX = event.clientX - panStart.current.x;
      const deltaY = event.clientY - panStart.current.y;
      panStart.current = { x: event.clientX, y: event.clientY };
      panBy(deltaX, deltaY);
    },
    [panBy],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (panStart.current) {
        panStart.current = null;
        setIsPanning(false);
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [setIsPanning],
  );

  const getWorldPoint = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      return screenToWorld(
        { x: event.clientX - rect.left, y: event.clientY - rect.top },
        viewport,
      );
    },
    [viewport],
  );

  return {
    viewport,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    getWorldPoint,
    isHandTool: getEffectiveTool() === 'hand',
  };
}

export function useCanvasSelectionActions() {
  const select = useCanvasSelectionStore((state) => state.select);
  const toggle = useCanvasSelectionStore((state) => state.toggle);
  const clear = useCanvasSelectionStore((state) => state.clear);
  const selectedIds = useCanvasSelectionStore((state) => state.selectedIds);

  return { select, toggle, clear, selectedIds };
}
