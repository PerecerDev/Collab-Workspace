import { DndContext } from '@dnd-kit/core';
import { useEffect, useRef, useState } from 'react';

import { useCommentSync } from '@/features/comments/hooks/useCommentSync';
import { BlockFormatBar } from '@/features/blocks/components/BlockFormatBar';
import { CanvasGrid } from '@/features/canvas/components/CanvasGrid';
import { CanvasObjectView } from '@/features/canvas/components/CanvasObjectView';
import { CanvasToolbar } from '@/features/canvas/components/CanvasToolbar';
import { ViewportControls } from '@/features/canvas/components/ViewportControls';
import { useCanvasDnd } from '@/features/canvas/hooks/useCanvasDnd';
import { useCanvasKeyboard } from '@/features/canvas/hooks/useCanvasKeyboard';
import {
  useCanvasPanZoom,
  useCanvasSelectionActions,
} from '@/features/canvas/hooks/useCanvasPanZoom';
import { useCanvasObjectsStore } from '@/features/canvas/stores/canvasObjectsStore';
import {
  useCanvasToolStore,
  useCanvasViewportStore,
} from '@/features/canvas/stores/canvasStores';
import { screenToWorld } from '@/features/canvas/utils/viewportMath';
import { LiveCursors } from '@/realtime/components/LiveCursors';
import { ReconnectOverlay } from '@/realtime/components/ReconnectOverlay';
import { usePresenceCursor } from '@/realtime/hooks/usePresenceCursor';
import {
  ConflictBanner,
  SyncStatusBadge,
} from '@/sync/components/ConflictBanner';
import { useCanvasSync } from '@/sync/hooks/useCanvasSync';
import { useSelectionSync } from '@/sync/hooks/useSelectionSync';
import { canvasSyncEngine } from '@/sync/canvasSyncEngine';
import { cn } from '@/shared/lib/cn';

interface CanvasSurfaceProps {
  workspaceId: string;
  userId: string;
  currentUserId?: string;
}

export function CanvasSurface({
  workspaceId,
  userId,
  currentUserId,
}: CanvasSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const objects = useCanvasObjectsStore((state) => state.objects);
  const loadObjects = useCanvasObjectsStore((state) => state.load);

  const viewport = useCanvasViewportStore((state) => state.viewport);
  const isPanning = useCanvasViewportStore((state) => state.isPanning);
  const activeTool = useCanvasToolStore((state) => state.activeTool);
  const getEffectiveTool = useCanvasToolStore(
    (state) => state.getEffectiveTool,
  );

  const { select, clear } = useCanvasSelectionActions();
  const { emitCursor } = usePresenceCursor({ workspaceId, enabled: true });

  useCanvasKeyboard({ actorId: currentUserId });
  useCanvasSync({ workspaceId, userId, enabled: true });
  useSelectionSync({ workspaceId, userId, enabled: true });
  useCommentSync({ workspaceId, userId, enabled: true });

  const { sensors, handleDragEnd } = useCanvasDnd(userId);

  const { handleWheel, handlePointerDown, handlePointerMove, handlePointerUp } =
    useCanvasPanZoom();

  useEffect(() => {
    loadObjects(workspaceId, userId);
  }, [loadObjects, userId, workspaceId]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleWorldClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const world = screenToWorld(
      { x: event.clientX - rect.left, y: event.clientY - rect.top },
      viewport,
    );

    const tool = getEffectiveTool();
    const placementTools = [
      'sticky',
      'text',
      'task',
      'rectangle',
      'ellipse',
    ] as const;

    if (placementTools.includes(tool as (typeof placementTools)[number])) {
      const block = canvasSyncEngine.createBlock(
        tool as (typeof placementTools)[number],
        world.x,
        world.y,
        userId,
      );
      select(block.id, false);
      return;
    }

    if (tool === 'select') {
      clear();
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    emitCursor(event.clientX - rect.left, event.clientY - rect.top);
  };

  const effectiveTool = getEffectiveTool();
  const cursorClass =
    effectiveTool === 'hand' || isPanning
      ? 'cursor-grab active:cursor-grabbing'
      : ['sticky', 'text', 'task', 'rectangle', 'ellipse'].includes(
            effectiveTool,
          )
        ? 'cursor-crosshair'
        : 'cursor-default';

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        ref={containerRef}
        className={cn('bg-canvas relative flex-1 overflow-hidden', cursorClass)}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseMove={handleMouseMove}
        role="application"
        aria-label="Collaborative canvas"
      >
        <ReconnectOverlay />
        <ConflictBanner />
        <BlockFormatBar actorId={currentUserId} />
        <CanvasGrid viewport={viewport} />
        <LiveCursors workspaceId={workspaceId} currentUserId={currentUserId} />

        <div
          className="absolute top-0 left-0 origin-top-left will-change-transform"
          style={{
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          }}
          data-canvas-world
        >
          <div
            className="absolute"
            style={{ left: -5000, top: -5000, width: 10000, height: 10000 }}
            onClick={handleWorldClick}
            aria-hidden="true"
          />

          {objects.map((object) => (
            <CanvasObjectView
              key={object.id}
              object={object}
              workspaceId={workspaceId}
              currentUserId={currentUserId}
              onSelect={select}
            />
          ))}
        </div>

        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <SyncStatusBadge />
        </div>

        <ViewportControls canvasWidth={size.width} canvasHeight={size.height} />
        <CanvasToolbar />

        <p className="text-text-muted pointer-events-none absolute bottom-6 left-4 z-10 max-w-lg text-xs">
          {activeTool === 'select' &&
            'Drag objects to sync · Shift+click multi-select · Delete to remove'}
          {activeTool === 'hand' && 'Drag to pan · Ctrl+scroll to zoom'}
          {activeTool === 'sticky' && 'Click to place a synced sticky note'}
          {activeTool === 'text' && 'Click to place a text block'}
          {activeTool === 'task' && 'Click to place a task block'}
          {activeTool === 'rectangle' && 'Click to place a rectangle'}
          {activeTool === 'ellipse' && 'Click to place an ellipse'}
          {' · Space to pan · V/H/N/T/K/R/O shortcuts'}
        </p>
      </div>
    </DndContext>
  );
}
