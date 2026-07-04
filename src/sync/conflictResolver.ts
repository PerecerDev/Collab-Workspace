import type {
  ConflictContext,
  ConflictResolution,
} from '@/sync/types/sync.types';

export function resolveByTimestamp(
  context: ConflictContext,
): ConflictResolution {
  const localTime = new Date(context.localUpdatedAt).getTime();
  const remoteTime = new Date(context.remoteUpdatedAt).getTime();

  if (remoteTime > localTime) return 'apply_remote';
  if (remoteTime < localTime) return 'keep_local';

  if (context.remoteActorId >= context.localActorId) {
    return 'apply_remote';
  }

  return 'keep_local';
}

export function shouldApplyRemoteUpdate(
  localUpdatedAt: string | undefined,
  localUpdatedBy: string | undefined,
  remoteUpdatedAt: string,
  remoteUpdatedBy: string,
): boolean {
  if (!localUpdatedAt || !localUpdatedBy) return true;

  return (
    resolveByTimestamp({
      localUpdatedAt,
      remoteUpdatedAt,
      localActorId: localUpdatedBy,
      remoteActorId: remoteUpdatedBy,
    }) === 'apply_remote'
  );
}
