import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { Button, type ButtonProps } from '@/shared/components/ui/Button';
import { cn } from '@/shared/lib/cn';

export interface IconButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    Pick<ButtonProps, 'variant' | 'isLoading'> {
  label: string;
  children: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, children, variant = 'ghost', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size="icon"
        className={cn('shrink-0', className)}
        aria-label={label}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
