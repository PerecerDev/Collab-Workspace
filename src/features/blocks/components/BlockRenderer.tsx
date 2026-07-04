import { blockRegistry } from '@/features/blocks/registry/blockRegistry';
import { ShapeBlock } from '@/features/blocks/components/ShapeBlock';
import { StickyNoteBlock } from '@/features/blocks/components/StickyNoteBlock';
import { TextBlock } from '@/features/blocks/components/TextBlock';
import { TaskBlock } from '@/features/tasks/components/TaskBlock';
import { useWorkspaceMembersQuery } from '@/features/workspace/hooks/useWorkspacesQuery';
import type { CanvasObjectNode } from '@/features/canvas/types/canvas.types';

interface BlockRendererProps {
  object: CanvasObjectNode;
  currentUserId?: string;
}

export function BlockRenderer({ object, currentUserId }: BlockRendererProps) {
  const definition = blockRegistry.getByType(object.type, {
    shapeKind: object.shapeKind,
  });
  const { data: members = [] } = useWorkspaceMembersQuery(object.workspaceId);

  if (object.type === 'sticky_note') {
    return (
      <StickyNoteBlock
        objectId={object.id}
        content={object.content}
        color={object.color}
        updatedAt={object.updatedAt}
        placeholder={definition.placeholder ?? 'Write a note…'}
        currentUserId={currentUserId}
      />
    );
  }

  if (object.type === 'text') {
    return (
      <TextBlock
        objectId={object.id}
        content={object.content}
        updatedAt={object.updatedAt}
        placeholder={definition.placeholder ?? 'Type something…'}
        currentUserId={currentUserId}
      />
    );
  }

  if (object.type === 'task') {
    return (
      <TaskBlock
        objectId={object.id}
        title={object.content}
        status={object.taskStatus ?? 'todo'}
        assigneeId={object.assigneeId}
        updatedAt={object.updatedAt}
        workspaceId={object.workspaceId}
        members={members}
        currentUserId={currentUserId}
      />
    );
  }

  return <ShapeBlock color={object.color} shapeKind={object.shapeKind} />;
}
