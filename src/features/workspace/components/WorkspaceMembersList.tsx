import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  getWorkspaceErrorMessage,
  useAddMemberMutation,
  useRemoveMemberMutation,
} from '@/features/workspace/hooks/useWorkspacesQuery';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Spinner } from '@/shared/components/ui/Spinner';
import type { User, Workspace } from '@/shared/types/domain';
import {
  addMemberSchema,
  type AddMemberFormValues,
} from '@/shared/types/schemas/workspace.schema';

interface WorkspaceMembersListProps {
  workspace: Workspace;
  members: User[] | undefined;
  isLoading: boolean;
  currentUserId: string;
}

export function WorkspaceMembersList({
  workspace,
  members,
  isLoading,
  currentUserId,
}: WorkspaceMembersListProps) {
  const isOwner = workspace.ownerId === currentUserId;
  const addMember = useAddMemberMutation(workspace.id);
  const removeMember = useRemoveMemberMutation(workspace.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: { email: '' },
  });

  const onAddMember = handleSubmit(async (values) => {
    try {
      await addMember.mutateAsync(values);
      reset();
    } catch {
      // Error surfaced via mutation state
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner label="Loading members" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="divide-border border-border divide-y rounded-xl border">
        {(members ?? []).map((member) => {
          const isMemberOwner = member.id === workspace.ownerId;

          return (
            <li
              key={member.id}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Avatar name={member.name} src={member.avatarUrl} size="sm" />
                <div>
                  <p className="text-text-primary text-sm font-medium">
                    {member.name}
                  </p>
                  <p className="text-text-muted text-xs">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={isMemberOwner ? 'accent' : 'default'}>
                  {isMemberOwner ? 'Owner' : 'Editor'}
                </Badge>
                {isOwner && !isMemberOwner ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={removeMember.isPending}
                    onClick={() => removeMember.mutate(member.id)}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {isOwner ? (
        <form className="space-y-3" onSubmit={onAddMember} noValidate>
          <div>
            <label
              htmlFor="member-email"
              className="text-text-primary text-sm font-medium"
            >
              Add member by email
            </label>
            <p className="text-text-muted mt-1 text-xs">
              Try{' '}
              <code className="bg-surface-elevated rounded px-1">
                sam@collab.dev
              </code>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="member-email"
              type="email"
              placeholder="teammate@company.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Button
              type="submit"
              className="sm:w-auto"
              isLoading={isSubmitting || addMember.isPending}
            >
              Add member
            </Button>
          </div>
          {addMember.isError ? (
            <p className="text-destructive text-sm" role="alert">
              {getWorkspaceErrorMessage(addMember.error)}
            </p>
          ) : null}
        </form>
      ) : (
        <p className="text-text-muted text-sm">
          Only the workspace owner can manage members.
        </p>
      )}
    </div>
  );
}
