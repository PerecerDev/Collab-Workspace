import { canvasSyncEngine } from '@/sync/canvasSyncEngine';

interface StickyNoteBlockProps {
  objectId: string;
  content: string;
  color: string;
  updatedAt: string;
  placeholder: string;
  currentUserId?: string;
}

export function StickyNoteBlock({
  objectId,
  content,
  color,
  updatedAt,
  placeholder,
  currentUserId,
}: StickyNoteBlockProps) {
  return (
    <div
      className="flex h-full flex-col rounded-lg border border-black/5 p-3 shadow-md"
      style={{ backgroundColor: color }}
    >
      <textarea
        className="h-full w-full resize-none bg-transparent text-sm text-zinc-900 outline-none"
        defaultValue={content}
        key={`${objectId}-${updatedAt}`}
        placeholder={placeholder}
        onPointerDown={(event) => event.stopPropagation()}
        onBlur={(event) => {
          if (!currentUserId) return;
          canvasSyncEngine.updateObjectContent(
            objectId,
            event.target.value,
            currentUserId,
          );
        }}
      />
    </div>
  );
}
