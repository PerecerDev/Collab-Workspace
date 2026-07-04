import { useEffect } from 'react';

import {
  useCanvasSelectionStore,
  useCanvasToolStore,
  useCanvasViewportStore,
} from '@/features/canvas/stores/canvasStores';
import type { CanvasTool } from '@/features/canvas/types/canvas.types';
import { CANVAS_TOOL_SHORTCUTS } from '@/features/canvas/types/canvas.types';
import { canvasSyncEngine } from '@/sync/canvasSyncEngine';

interface UseCanvasKeyboardOptions {
  actorId?: string;
}

export function useCanvasKeyboard({ actorId }: UseCanvasKeyboardOptions = {}) {
  const setActiveTool = useCanvasToolStore((state) => state.setActiveTool);
  const setSpacePressed = useCanvasToolStore((state) => state.setSpacePressed);
  const zoomIn = useCanvasViewportStore((state) => state.zoomIn);
  const zoomOut = useCanvasViewportStore((state) => state.zoomOut);
  const resetViewport = useCanvasViewportStore((state) => state.resetViewport);
  const clearSelection = useCanvasSelectionStore((state) => state.clear);
  const selectedIds = useCanvasSelectionStore((state) => state.selectedIds);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isEditable =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (event.code === 'Space' && !isEditable) {
        event.preventDefault();
        setSpacePressed(true);
        return;
      }

      if (isEditable) return;

      const toolKey = Object.entries(CANVAS_TOOL_SHORTCUTS).find(
        ([, shortcut]) => shortcut.toLowerCase() === event.key.toLowerCase(),
      );

      if (toolKey) {
        event.preventDefault();
        setActiveTool(toolKey[0] as CanvasTool);
        return;
      }

      if (event.key === 'Escape') {
        clearSelection();
        return;
      }

      if (
        (event.key === 'Delete' || event.key === 'Backspace') &&
        actorId &&
        selectedIds.length > 0
      ) {
        event.preventDefault();
        selectedIds.forEach((id) => canvasSyncEngine.deleteObject(id, actorId));
        return;
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        zoomIn();
        return;
      }

      if (event.key === '-') {
        event.preventDefault();
        zoomOut();
        return;
      }

      if (event.key === '0' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        resetViewport();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    actorId,
    clearSelection,
    resetViewport,
    selectedIds,
    setActiveTool,
    setSpacePressed,
    zoomIn,
    zoomOut,
  ]);
}
