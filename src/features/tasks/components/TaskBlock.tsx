import { Avatar } from '@/shared/components/ui/Avatar';
import { Badge } from '@/shared/components/ui/Badge';
import type { User } from '@/shared/types/domain';
import type { TaskBlockStatus } from '@/shared/types/domain';
import { canvasSyncEngine } from '@/sync/canvasSyncEngine';
import {
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  TASK_STATUS_VARIANTS,
} from '@/features/tasks/types/task.types';

interface TaskBlockProps {
  objectId: string;
  title: string;
  status: TaskBlockStatus;
  assigneeId?: string;
  updatedAt: string;
  workspaceId: string;
  members: User[];
  currentUserId?: string;
}

export function TaskBlock({
  objectId,
  title,
  status,
  assigneeId,
  updatedAt,
  workspaceId,
  members,
  currentUserId,
}: TaskBlockProps) {
  const assignee = members.find((member) => member.id === assigneeId);

  return (
    <div className="border-border bg-surface flex h-full flex-col gap-3 rounded-xl border p-3 shadow-md">
      <div className="flex items-start justify-between gap-2">
        <Badge variant={TASK_STATUS_VARIANTS[status]}>
          {TASK_STATUS_LABELS[status]}
        </Badge>
        {assignee ? (
          <Avatar name={assignee.name} src={assignee.avatarUrl} size="sm" />
        ) : (
          <span className="text-text-muted text-xs">Unassigned</span>
        )}
      </div>

      <textarea
        className="text-text-primary min-h-[3rem] w-full flex-1 resize-none bg-transparent text-sm font-medium outline-none"
        defaultValue={title}
        key={`${objectId}-${updatedAt}`}
        placeholder="Task title…"
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

      <div
        className="border-border/60 flex flex-wrap items-center gap-2 border-t pt-2"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <label className="sr-only" htmlFor={`task-status-${objectId}`}>
          Task status
        </label>
        <select
          id={`task-status-${objectId}`}
          className="border-border bg-surface-elevated text-text-primary rounded-md border px-2 py-1 text-xs"
          value={status}
          onChange={(event) => {
            if (!currentUserId) return;
            canvasSyncEngine.updateTaskStatus(
              objectId,
              event.target.value as TaskBlockStatus,
              currentUserId,
              workspaceId,
            );
          }}
        >
          {TASK_STATUSES.map((item) => (
            <option key={item} value={item}>
              {TASK_STATUS_LABELS[item]}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor={`task-assignee-${objectId}`}>
          Assignee
        </label>
        <select
          id={`task-assignee-${objectId}`}
          className="border-border bg-surface-elevated text-text-primary min-w-0 flex-1 rounded-md border px-2 py-1 text-xs"
          value={assigneeId ?? ''}
          onChange={(event) => {
            if (!currentUserId) return;
            canvasSyncEngine.updateTaskAssignee(
              objectId,
              event.target.value || undefined,
              currentUserId,
              workspaceId,
            );
          }}
        >
          <option value="">Unassigned</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
