import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAuth } from '@/features/auth/stores/authStore';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { APP_NAME, ROUTES } from '@/shared/lib/constants';
import {
  loginSchema,
  type LoginFormValues,
} from '@/shared/types/schemas/auth.schema';

export function LoginPage() {
  const { signIn, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alex@collab.dev',
      name: 'Alex Parker',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await signIn(values.email, values.name);
  });

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <div className="border-border bg-surface rounded-xl border p-8 shadow-lg">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-accent text-sm font-medium">Welcome back</p>
          <h1 className="text-text-primary text-2xl font-semibold">
            Sign in to {APP_NAME}
          </h1>
          <p className="text-text-muted text-sm">
            Mock authentication for development. Your session persists locally.
          </p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-text-primary text-sm font-medium"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-text-primary text-sm font-medium"
            >
              Display name
            </label>
            <Input
              id="name"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          {error ? (
            <p className="text-destructive text-sm" role="alert">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting || isLoading}
          >
            Continue
          </Button>
        </form>

        <p className="text-text-muted mt-6 text-center text-xs">
          By continuing you agree to use this portfolio demo responsibly.{' '}
          <Link to={ROUTES.home} className="text-accent hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
