import { IconButton } from '@/shared/components/ui/IconButton';
import {
  SHAPE_FILL_COLORS,
  STICKY_NOTE_COLORS,
} from '@/features/canvas/types/canvas.types';
import { useCanvasObjectsStore } from '@/features/canvas/stores/canvasObjectsStore';
import { useCanvasSelectionStore } from '@/features/canvas/stores/canvasStores';
import { canvasSyncEngine } from '@/sync/canvasSyncEngine';
import { cn } from '@/shared/lib/cn';

interface BlockFormatBarProps {
  actorId?: string;
}

export function BlockFormatBar({ actorId }: BlockFormatBarProps) {
  const selectedIds = useCanvasSelectionStore((state) => state.selectedIds);
  const objects = useCanvasObjectsStore((state) => state.objects);

  if (!actorId || selectedIds.length !== 1) return null;

  const object = objects.find((item) => item.id === selectedIds[0]);
  if (!object) return null;

  const palette =
    object.type === 'sticky_note'
      ? STICKY_NOTE_COLORS
      : object.type === 'shape'
        ? SHAPE_FILL_COLORS
        : null;

  return (
    <div
      className="border-border bg-surface absolute top-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-xl border px-2 py-1.5 shadow-lg"
      role="toolbar"
      aria-label="Block formatting"
      onPointerDown={(event) => event.stopPropagation()}
    >
      {palette ? (
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Colors"
        >
          {palette.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                'size-6 rounded-full border-2 transition-transform hover:scale-110',
                object.color === color
                  ? 'border-accent scale-110'
                  : 'border-transparent',
              )}
              style={{ backgroundColor: color }}
              aria-label={`Set color ${color}`}
              aria-pressed={object.color === color}
              onClick={() =>
                canvasSyncEngine.updateObjectColor(object.id, color, actorId)
              }
            />
          ))}
        </div>
      ) : null}

      <IconButton
        label="Delete block"
        className="text-danger hover:bg-danger/10"
        onClick={() => canvasSyncEngine.deleteObject(object.id, actorId)}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
        </svg>
      </IconButton>
    </div>
  );
}
