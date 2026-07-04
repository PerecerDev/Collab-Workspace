import { delay, storage } from '@/shared/lib/storage';
import { findUserByEmail } from '@/shared/mocks/data';
import type { User } from '@/shared/types/domain';
import {
  loginSchema,
  userSchema,
  type LoginFormValues,
} from '@/shared/types/schemas/auth.schema';

interface SessionPayload {
  user: User;
  token: string;
  expiresAt: string;
}

function createSessionUser(input: LoginFormValues): User {
  const existing = findUserByEmail(input.email);

  if (existing) {
    return { ...existing, name: input.name.trim() };
  }

  return {
    id: crypto.randomUUID(),
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    createdAt: new Date().toISOString(),
  };
}

function buildSession(user: User): SessionPayload {
  return {
    user,
    token: crypto.randomUUID(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  };
}

export const authService = {
  async getSession(): Promise<SessionPayload | null> {
    await delay(150);
    const session = storage.get<SessionPayload>(storage.SESSION_KEY);
    if (!session) return null;

    const parsed = userSchema.safeParse(session.user);
    if (!parsed.success) {
      storage.remove(storage.SESSION_KEY);
      return null;
    }

    if (new Date(session.expiresAt) < new Date()) {
      storage.remove(storage.SESSION_KEY);
      return null;
    }

    return session;
  },

  async signIn(input: LoginFormValues): Promise<SessionPayload> {
    await delay(350);
    const validated = loginSchema.parse(input);
    const user = createSessionUser(validated);
    const session = buildSession(user);
    storage.set(storage.SESSION_KEY, session);
    return session;
  },

  async signOut(): Promise<void> {
    await delay(100);
    storage.remove(storage.SESSION_KEY);
  },
};

export type { SessionPayload };
