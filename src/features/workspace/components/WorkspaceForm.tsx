import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Textarea } from '@/shared/components/ui/Textarea';
import {
  createWorkspaceSchema,
  type CreateWorkspaceFormValues,
} from '@/shared/types/schemas/workspace.schema';

interface WorkspaceFormProps {
  defaultValues?: Partial<CreateWorkspaceFormValues>;
  submitLabel: string;
  isSubmitting?: boolean;
  readOnly?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: CreateWorkspaceFormValues) => Promise<void>;
  onCancel?: () => void;
}

export function WorkspaceForm({
  defaultValues,
  submitLabel,
  isSubmitting = false,
  readOnly = false,
  errorMessage,
  onSubmit,
  onCancel,
}: WorkspaceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      description: '',
      ...defaultValues,
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <label
          htmlFor="workspace-name"
          className="text-text-primary text-sm font-medium"
        >
          Name
        </label>
        <Input
          id="workspace-name"
          placeholder="Product Roadmap"
          disabled={readOnly}
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="workspace-description"
          className="text-text-primary text-sm font-medium"
        >
          Description
        </label>
        <Textarea
          id="workspace-description"
          placeholder="What is this workspace for?"
          rows={4}
          disabled={readOnly}
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      {errorMessage ? (
        <p className="text-destructive text-sm" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2">
        {!readOnly ? (
          <Button type="submit" isLoading={isSubmitting}>
            {submitLabel}
          </Button>
        ) : null}
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
