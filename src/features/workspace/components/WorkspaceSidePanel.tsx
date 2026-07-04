import { useState } from 'react';

import { ActivityFeed } from '@/features/activity/components/ActivityFeed';
import { CommentThread } from '@/features/comments/components/CommentThread';
import { useCanvasObjectsStore } from '@/features/canvas/stores/canvasObjectsStore';
import { useCanvasSelectionStore } from '@/features/canvas/stores/canvasStores';
import { cn } from '@/shared/lib/cn';

type SidePanelTab = 'activity' | 'comments';

interface WorkspaceSidePanelProps {
  workspaceId: string;
}

export function WorkspaceSidePanel({ workspaceId }: WorkspaceSidePanelProps) {
  const [tab, setTab] = useState<SidePanelTab>('activity');
  const selectedIds = useCanvasSelectionStore((state) => state.selectedIds);
  const objects = useCanvasObjectsStore((state) => state.objects);

  const selectedObject =
    selectedIds.length === 1
      ? objects.find((object) => object.id === selectedIds[0])
      : undefined;

  return (
    <aside
      className="border-border bg-surface hidden w-80 shrink-0 flex-col border-l lg:flex"
      aria-label="Workspace collaboration panel"
    >
      <div className="border-border flex border-b">
        {(['activity', 'comments'] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              'text-text-muted hover:text-text-primary flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors',
              tab === item &&
                'text-accent border-accent bg-accent-muted/30 border-b-2',
            )}
            onClick={() => setTab(item)}
            aria-pressed={tab === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {tab === 'activity' ? (
          <ActivityFeed workspaceId={workspaceId} />
        ) : selectedObject ? (
          <CommentThread
            workspaceId={workspaceId}
            targetType="object"
            targetId={selectedObject.id}
            emptyMessage="Start a thread on this block."
          />
        ) : (
          <CommentThread
            workspaceId={workspaceId}
            targetType="workspace"
            targetId={workspaceId}
            emptyMessage="Select a block to comment on it, or comment on the workspace."
          />
        )}
      </div>
    </aside>
  );
}
