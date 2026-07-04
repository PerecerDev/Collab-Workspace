import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { cn } from '@/shared/lib/cn';

describe('cn', () => {
  it('merges class names and resolves tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    const hidden = false;
    expect(cn('text-sm', hidden && 'hidden', 'font-medium')).toBe(
      'text-sm font-medium',
    );
  });

  it('applies utility classes to elements', () => {
    render(
      <div data-testid="surface" className="bg-surface text-text-primary" />,
    );
    expect(screen.getByTestId('surface')).toHaveClass('bg-surface');
  });
});
