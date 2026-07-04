import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { BlockRenderer } from '@/features/blocks/components/BlockRenderer';
import { ResizeHandles } from '@/features/blocks/components/ResizeHandles';
import { useCanvasSelectionStore } from '@/features/canvas/stores/canvasStores';
import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';
import { getPresenceColorClass } from '@/realtime/presence/presenceStore';
import { useRemoteSelections } from '@/sync/hooks/useSelectionSync';
import { cn } from '@/shared/lib/cn';

interface CanvasObjectViewProps {
  object: CanvasObjectNode;
  workspaceId: string;
  currentUserId?: string;
  onSelect: (id: string, additive: boolean) => void;
}

export function CanvasObjectView({
  object,
  workspaceId,
  currentUserId,
  onSelect,
}: CanvasObjectViewProps) {
  const isSelected = useCanvasSelectionStore((state) =>
    state.selectedIds.includes(object.id),
  );
  const remoteSelections = useRemoteSelections(
    workspaceId,
    object.id,
    currentUserId,
  );

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: object.id,
      data: { object },
    });

  const style: React.CSSProperties = {
    position: 'absolute',
    left: object.x,
    top: object.y,
    width: object.width,
    height: object.height,
    zIndex: object.zIndex,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'touch-none select-none',
        isDragging && 'opacity-80',
        isSelected &&
          'ring-accent ring-2 ring-offset-2 ring-offset-transparent',
        remoteSelections.length > 0 &&
          !isSelected &&
          'ring-2 ring-offset-2 ring-offset-transparent',
      )}
      onPointerDown={(event) => {
        event.stopPropagation();
        onSelect(object.id, event.shiftKey);
      }}
      {...listeners}
      {...attributes}
    >
      {remoteSelections.map((selection) => (
        <span
          key={selection.userId}
          className={cn(
            'pointer-events-none absolute inset-0 rounded-lg ring-2 ring-offset-2 ring-offset-transparent',
            getPresenceColorClass(selection.colorIndex).replace('bg-', 'ring-'),
          )}
          aria-label={`Selected by ${selection.userName}`}
        />
      ))}

      <BlockRenderer object={object} currentUserId={currentUserId} />

      {isSelected ? (
        <ResizeHandles object={object} actorId={currentUserId} />
      ) : null}
    </div>
  );
}
