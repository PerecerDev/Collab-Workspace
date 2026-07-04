import { canvasSyncEngine } from '@/sync/canvasSyncEngine';

interface TextBlockProps {
  objectId: string;
  content: string;
  updatedAt: string;
  placeholder: string;
  currentUserId?: string;
}

export function TextBlock({
  objectId,
  content,
  updatedAt,
  placeholder,
  currentUserId,
}: TextBlockProps) {
  return (
    <div className="border-border/60 bg-surface/90 flex h-full flex-col rounded-md border p-3 shadow-sm backdrop-blur-sm">
      <textarea
        className="text-text h-full w-full resize-none bg-transparent text-base leading-relaxed outline-none"
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
