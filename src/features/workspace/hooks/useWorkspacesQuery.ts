import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/features/auth/stores/authStore';
import {
  workspaceService,
  WorkspaceServiceError,
} from '@/features/workspace/services/workspaceService';
import type {
  AddMemberFormValues,
  CreateWorkspaceFormValues,
  UpdateWorkspaceFormValues,
} from '@/shared/types/schemas/workspace.schema';

export const workspaceKeys = {
  all: ['workspaces'] as const,
  detail: (id: string) => ['workspaces', id] as const,
  members: (id: string) => ['workspaces', id, 'members'] as const,
};

export function useWorkspacesQuery() {
  const { user } = useAuth();

  return useQuery({
    queryKey: workspaceKeys.all,
    queryFn: () => workspaceService.listWorkspaces(user?.id ?? ''),
    enabled: Boolean(user?.id),
  });
}

export function useWorkspaceQuery(id: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: workspaceKeys.detail(id ?? ''),
    queryFn: () => workspaceService.getWorkspace(id ?? '', user?.id ?? ''),
    enabled: Boolean(id && user?.id),
  });
}

export function useWorkspaceMembersQuery(workspaceId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: workspaceKeys.members(workspaceId ?? ''),
    queryFn: () =>
      workspaceService.resolveMemberUsers(workspaceId ?? '', user?.id ?? ''),
    enabled: Boolean(workspaceId && user?.id),
  });
}

export function useCreateWorkspaceMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: CreateWorkspaceFormValues) =>
      workspaceService.createWorkspace(input, user?.id ?? ''),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function useUpdateWorkspaceMutation(workspaceId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: UpdateWorkspaceFormValues) =>
      workspaceService.updateWorkspace(workspaceId, input, user?.id ?? ''),
    onSuccess: (workspace) => {
      queryClient.setQueryData(workspaceKeys.detail(workspaceId), workspace);
      void queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function useDeleteWorkspaceMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (workspaceId: string) =>
      workspaceService.deleteWorkspace(workspaceId, user?.id ?? ''),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function useAddMemberMutation(workspaceId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: AddMemberFormValues) =>
      workspaceService.addMember(workspaceId, input, user?.id ?? ''),
    onSuccess: (workspace) => {
      queryClient.setQueryData(workspaceKeys.detail(workspaceId), workspace);
      void queryClient.invalidateQueries({
        queryKey: workspaceKeys.members(workspaceId),
      });
      void queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function useRemoveMemberMutation(workspaceId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (memberId: string) =>
      workspaceService.removeMember(workspaceId, memberId, user?.id ?? ''),
    onSuccess: (workspace) => {
      queryClient.setQueryData(workspaceKeys.detail(workspaceId), workspace);
      void queryClient.invalidateQueries({
        queryKey: workspaceKeys.members(workspaceId),
      });
      void queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function getWorkspaceErrorMessage(error: unknown): string {
  if (error instanceof WorkspaceServiceError) return error.message;
  return 'Something went wrong. Please try again.';
}
