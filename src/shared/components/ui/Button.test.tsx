import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Button } from '@/shared/components/ui/Button';

describe('Button', () => {
  it('renders children and handles click', async () => {
    const user = userEvent.setup();
    let clicked = false;

    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click me
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(clicked).toBe(true);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Save</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
