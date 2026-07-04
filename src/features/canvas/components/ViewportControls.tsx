import { Button } from '@/shared/components/ui/Button';
import { cn } from '@/shared/lib/cn';

import { useCanvasObjectsStore } from '@/features/canvas/stores/canvasObjectsStore';
import { useCanvasViewportStore } from '@/features/canvas/stores/canvasStores';
import {
  fitViewportToBounds,
  getObjectsBounds,
} from '@/features/canvas/utils/viewportMath';

interface ViewportControlsProps {
  canvasWidth: number;
  canvasHeight: number;
  className?: string;
}

export function ViewportControls({
  canvasWidth,
  canvasHeight,
  className,
}: ViewportControlsProps) {
  const viewport = useCanvasViewportStore((state) => state.viewport);
  const zoomIn = useCanvasViewportStore((state) => state.zoomIn);
  const zoomOut = useCanvasViewportStore((state) => state.zoomOut);
  const resetViewport = useCanvasViewportStore((state) => state.resetViewport);
  const setViewport = useCanvasViewportStore((state) => state.setViewport);
  const objects = useCanvasObjectsStore((state) => state.objects);

  const center = { x: canvasWidth / 2, y: canvasHeight / 2 };

  const handleFit = () => {
    const bounds = getObjectsBounds(objects);
    if (!bounds) {
      resetViewport();
      return;
    }

    setViewport(
      fitViewportToBounds(viewport, bounds, {
        width: canvasWidth,
        height: canvasHeight,
      }),
    );
  };

  return (
    <div
      className={cn(
        'border-border bg-surface absolute top-4 right-4 z-20 flex items-center gap-1 rounded-lg border p-1 shadow-md',
        className,
      )}
      aria-label="Viewport controls"
    >
      <Button
        size="sm"
        variant="ghost"
        onClick={() => zoomOut(center)}
        aria-label="Zoom out"
      >
        −
      </Button>
      <span className="text-text-muted min-w-12 text-center text-xs tabular-nums">
        {Math.round(viewport.zoom * 100)}%
      </span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => zoomIn(center)}
        aria-label="Zoom in"
      >
        +
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleFit}
        aria-label="Fit to content"
      >
        Fit
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={resetViewport}
        aria-label="Reset viewport"
      >
        100%
      </Button>
    </div>
  );
}
