import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/shared/lib/cn';

import {
  getPresenceColorClass,
  getPresenceTextColorClass,
  usePresenceUsers,
} from '@/realtime/presence/presenceStore';

interface LiveCursorsProps {
  workspaceId: string | undefined;
  currentUserId?: string;
  className?: string;
}

export function LiveCursors({
  workspaceId,
  currentUserId,
  className,
}: LiveCursorsProps) {
  const others = usePresenceUsers(workspaceId, currentUserId);
  const reduceMotion = useReducedMotion();

  if (!workspaceId) return null;

  return (
    <div className={cn('pointer-events-none absolute inset-0 z-10', className)}>
      {others
        .filter((user) => user.cursor)
        .map((user) => (
          <motion.div
            key={user.userId}
            className="absolute top-0 left-0"
            initial={false}
            animate={{
              x: user.cursor?.x ?? 0,
              y: user.cursor?.y ?? 0,
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 500, damping: 40, mass: 0.8 }
            }
          >
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              className={cn(
                'drop-shadow-sm',
                getPresenceTextColorClass(user.colorIndex),
              )}
              aria-hidden="true"
            >
              <path
                d="M1 1L1 15.5L5 11.5L8.5 19L10.5 18L7 10.5L12 10.5L1 1Z"
                fill="currentColor"
              />
            </svg>
            <span
              className={cn(
                'mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm',
                getPresenceColorClass(user.colorIndex),
              )}
            >
              {user.userName}
            </span>
          </motion.div>
        ))}
    </div>
  );
}
