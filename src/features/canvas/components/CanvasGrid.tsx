import type { ViewportState } from '@/features/canvas/types/canvas.types';

interface CanvasGridProps {
  viewport: ViewportState;
}

export function CanvasGrid({ viewport }: CanvasGridProps) {
  const gridSize = 24 * viewport.zoom;
  const offsetX = viewport.x % gridSize;
  const offsetY = viewport.y % gridSize;

  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          'radial-gradient(circle, var(--cw-border) 1px, transparent 1px)',
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
      }}
      aria-hidden="true"
    />
  );
}
