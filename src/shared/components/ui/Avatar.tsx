import { cn } from '@/shared/lib/cn';

const sizeClasses = {
  sm: 'size-6 text-[10px]',
  md: 'size-8 text-xs',
  lg: 'size-10 text-sm',
} as const;

export interface AvatarProps {
  name: string;
  src?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
  presenceColor?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({
  name,
  src,
  size = 'md',
  className,
  presenceColor,
}: AvatarProps) {
  return (
    <span
      className={cn(
        'bg-accent-muted text-accent relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium',
        sizeClasses[size],
        className,
      )}
      title={name}
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
      <span className="sr-only">{name}</span>
      {presenceColor ? (
        <span
          className={cn(
            'ring-surface absolute right-0 bottom-0 size-2 rounded-full ring-2',
            presenceColor,
          )}
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}
