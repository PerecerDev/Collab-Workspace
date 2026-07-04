import { IconButton } from '@/shared/components/ui/IconButton';
import { cn } from '@/shared/lib/cn';

import { useCanvasToolStore } from '@/features/canvas/stores/canvasStores';
import type { CanvasTool } from '@/features/canvas/types/canvas.types';
import {
  CANVAS_TOOL_LABELS,
  CANVAS_TOOL_SHORTCUTS,
} from '@/features/canvas/types/canvas.types';

const TOOLS: CanvasTool[] = ['select', 'hand', 'sticky'];

function ToolIcon({ tool }: { tool: CanvasTool }) {
  if (tool === 'select') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M4 4l7 16 2.5-7.5L21 10 4 4z" />
      </svg>
    );
  }

  if (tool === 'hand') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M7 11V7a2 2 0 1 1 4 0v4M11 9V6a2 2 0 1 1 4 0v6M15 10V7a2 2 0 1 1 4 0v8a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-2a2 2 0 1 1 4 0" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="14" height="14" rx="1" />
      <path d="M9 10h6M9 14h4" />
    </svg>
  );
}

export function CanvasToolbar() {
  const activeTool = useCanvasToolStore((state) => state.activeTool);
  const setActiveTool = useCanvasToolStore((state) => state.setActiveTool);

  return (
    <div
      className="border-border bg-surface absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-xl border p-1 shadow-lg"
      role="toolbar"
      aria-label="Canvas tools"
    >
      {TOOLS.map((tool) => (
        <IconButton
          key={tool}
          label={`${CANVAS_TOOL_LABELS[tool]} (${CANVAS_TOOL_SHORTCUTS[tool]})`}
          onClick={() => setActiveTool(tool)}
          className={cn(activeTool === tool && 'bg-accent-muted text-accent')}
        >
          <ToolIcon tool={tool} />
        </IconButton>
      ))}
    </div>
  );
}
