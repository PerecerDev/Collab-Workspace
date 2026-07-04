import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { useCanvasSelectionStore } from '@/features/canvas/stores/canvasStores';
import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';
import { getPresenceColorClass } from '@/realtime/presence/presenceStore';
import { canvasSyncEngine } from '@/sync/canvasSyncEngine';
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

      {object.type === 'sticky_note' ? (
        <div
          className="flex h-full flex-col rounded-lg border border-black/5 p-3 shadow-md"
          style={{ backgroundColor: object.color }}
        >
          <textarea
            className="h-full w-full resize-none bg-transparent text-sm text-zinc-900 outline-none"
            defaultValue={object.content}
            key={`${object.id}-${object.updatedAt}`}
            placeholder="Write a note…"
            onPointerDown={(event) => event.stopPropagation()}
            onBlur={(event) => {
              if (!currentUserId) return;
              canvasSyncEngine.updateObjectContent(
                object.id,
                event.target.value,
                currentUserId,
              );
            }}
          />
        </div>
      ) : (
        <div
          className="h-full w-full rounded-lg border-2 border-dashed border-zinc-400/60 bg-white/40 dark:bg-zinc-800/40"
          aria-label="Shape"
        />
      )}

      {isSelected ? <SelectionHandles /> : null}
    </div>
  );
}

function SelectionHandles() {
  const handles = ['nw', 'ne', 'sw', 'se'];

  return (
    <>
      {handles.map((handle) => (
        <span
          key={handle}
          className="border-accent bg-surface absolute size-2.5 rounded-full border-2 shadow-sm"
          style={{
            top: handle.includes('n') ? -5 : undefined,
            bottom: handle.includes('s') ? -5 : undefined,
            left: handle.includes('w') ? -5 : undefined,
            right: handle.includes('e') ? -5 : undefined,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
