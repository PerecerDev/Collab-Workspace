import type { TaskBlockStatus } from '@/shared/types/domain';

export const TASK_STATUS_LABELS: Record<TaskBlockStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export const TASK_STATUS_VARIANTS = {
  todo: 'default',
  in_progress: 'warning',
  done: 'success',
} as const;

export const TASK_STATUSES: TaskBlockStatus[] = ['todo', 'in_progress', 'done'];
