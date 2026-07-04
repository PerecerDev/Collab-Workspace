export type SyncOperationType = 'create' | 'update' | 'delete';

export type SyncOperationStatus = 'pending' | 'confirmed' | 'failed';

export interface OptimisticOperation {
  id: string;
  type: SyncOperationType;
  objectId: string;
  workspaceId: string;
  snapshot: unknown;
  status: SyncOperationStatus;
  createdAt: string;
}

export interface SyncConflict {
  objectId: string;
  message: string;
  resolvedAt: string;
}

export type ConflictResolution = 'apply_remote' | 'keep_local' | 'skip';

export interface ConflictContext {
  localUpdatedAt: string;
  remoteUpdatedAt: string;
  localActorId: string;
  remoteActorId: string;
}
