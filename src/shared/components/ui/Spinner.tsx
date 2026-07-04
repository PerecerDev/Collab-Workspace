import { cn } from '@/shared/lib/cn';

export interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = 'Loading' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'border-accent inline-block size-5 animate-spin rounded-full border-2 border-t-transparent',
        className,
      )}
    />
  );
}
