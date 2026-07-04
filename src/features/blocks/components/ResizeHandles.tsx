import { useCallback, useEffect, useRef } from 'react';

import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';
import { useCanvasViewportStore } from '@/features/canvas/stores/canvasStores';
import { canvasSyncEngine } from '@/sync/canvasSyncEngine';
import { cn } from '@/shared/lib/cn';

type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se';

interface ResizeHandlesProps {
  object: CanvasObjectNode;
  actorId?: string;
}

const MIN_SIZE = 80;

export function ResizeHandles({ object, actorId }: ResizeHandlesProps) {
  const sessionRef = useRef<{
    handle: ResizeHandle;
    startX: number;
    startY: number;
    origin: CanvasObjectNode;
  } | null>(null);

  const zoom = useCanvasViewportStore((state) => state.viewport.zoom);

  const finishResize = useCallback(() => {
    sessionRef.current = null;
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const session = sessionRef.current;
      if (!session || !actorId) return;

      const dx = (event.clientX - session.startX) / zoom;
      const dy = (event.clientY - session.startY) / zoom;
      const { origin, handle } = session;

      let nextX = origin.x;
      let nextY = origin.y;
      let nextWidth = origin.width;
      let nextHeight = origin.height;

      if (handle.includes('e')) {
        nextWidth = Math.max(MIN_SIZE, origin.width + dx);
      }
      if (handle.includes('w')) {
        nextWidth = Math.max(MIN_SIZE, origin.width - dx);
        nextX = origin.x + (origin.width - nextWidth);
      }
      if (handle.includes('s')) {
        nextHeight = Math.max(MIN_SIZE, origin.height + dy);
      }
      if (handle.includes('n')) {
        nextHeight = Math.max(MIN_SIZE, origin.height - dy);
        nextY = origin.y + (origin.height - nextHeight);
      }

      canvasSyncEngine.resizeObject(
        object.id,
        nextX,
        nextY,
        nextWidth,
        nextHeight,
        actorId,
      );
    };

    const handlePointerUp = () => finishResize();

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [actorId, finishResize, object.id, zoom]);

  const handles: ResizeHandle[] = ['nw', 'ne', 'sw', 'se'];

  return (
    <>
      {handles.map((handle) => (
        <span
          key={handle}
          className={cn(
            'border-accent bg-surface absolute size-2.5 cursor-nwse-resize rounded-full border-2 shadow-sm',
            handle === 'ne' && 'cursor-nesw-resize',
            handle === 'sw' && 'cursor-nesw-resize',
          )}
          style={{
            top: handle.includes('n') ? -5 : undefined,
            bottom: handle.includes('s') ? -5 : undefined,
            left: handle.includes('w') ? -5 : undefined,
            right: handle.includes('e') ? -5 : undefined,
          }}
          onPointerDown={(event) => {
            if (!actorId) return;
            event.stopPropagation();
            event.preventDefault();
            sessionRef.current = {
              handle,
              startX: event.clientX,
              startY: event.clientY,
              origin: { ...object },
            };
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
