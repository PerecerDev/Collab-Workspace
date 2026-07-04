import { beforeEach, describe, expect, it } from 'vitest';

import { authService } from '@/features/auth/services/authService';
import { storage } from '@/shared/lib/storage';

describe('authService', () => {
  beforeEach(() => {
    storage.remove(storage.SESSION_KEY);
  });

  it('returns null when no session exists', async () => {
    await expect(authService.getSession()).resolves.toBeNull();
  });

  it('creates and restores a mock session', async () => {
    const session = await authService.signIn({
      email: 'alex@collab.dev',
      name: 'Alex Parker',
    });

    expect(session.user.email).toBe('alex@collab.dev');
    expect(session.token).toBeTruthy();

    const restored = await authService.getSession();
    expect(restored?.user.name).toBe('Alex Parker');
  });

  it('clears session on sign out', async () => {
    await authService.signIn({
      email: 'sam@collab.dev',
      name: 'Sam Rivera',
    });

    await authService.signOut();
    await expect(authService.getSession()).resolves.toBeNull();
  });
});
