import { create } from 'zustand';

import {
  authService,
  type SessionPayload,
} from '@/features/auth/services/authService';
import type { User } from '@/shared/types/domain';

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  error: string | null;
  initialize: () => Promise<void>;
  signIn: (email: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

function applySession(
  set: (state: Partial<AuthState>) => void,
  session: SessionPayload | null,
) {
  if (!session) {
    set({
      user: null,
      token: null,
      status: 'unauthenticated',
      error: null,
    });
    return;
  }

  set({
    user: session.user,
    token: session.token,
    status: 'authenticated',
    error: null,
  });
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  status: 'idle',
  error: null,

  initialize: async () => {
    set({ status: 'loading', error: null });
    try {
      const session = await authService.getSession();
      applySession(set, session);
      if (!session) {
        set({ status: 'unauthenticated' });
      }
    } catch {
      set({
        status: 'unauthenticated',
        error: 'Unable to restore your session. Please sign in again.',
      });
    }
  },

  signIn: async (email, name) => {
    set({ status: 'loading', error: null });
    try {
      const session = await authService.signIn({ email, name });
      applySession(set, session);
    } catch {
      set({
        status: 'unauthenticated',
        error: 'Sign in failed. Check your details and try again.',
      });
    }
  },

  signOut: async () => {
    set({ status: 'loading', error: null });
    try {
      await authService.signOut();
      applySession(set, null);
    } catch {
      set({
        error: 'Sign out failed. Please try again.',
        status: 'authenticated',
      });
    }
  },
}));

export function useAuth() {
  const state = useAuthStore();
  return {
    user: state.user,
    token: state.token,
    status: state.status,
    error: state.error,
    isAuthenticated: state.status === 'authenticated',
    isLoading: state.status === 'idle' || state.status === 'loading',
    initialize: state.initialize,
    signIn: state.signIn,
    signOut: state.signOut,
  };
}
