import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  return mode === 'system' ? getSystemTheme() : mode;
}

function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      resolvedTheme: getSystemTheme(),
      setMode: (mode) => {
        const resolvedTheme = resolveTheme(mode);
        applyTheme(resolvedTheme);
        set({ mode, resolvedTheme });
      },
    }),
    {
      name: 'collab-workspace-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolvedTheme = resolveTheme(state.mode);
          applyTheme(resolvedTheme);
          state.resolvedTheme = resolvedTheme;
        }
      },
    },
  ),
);

export function initializeTheme() {
  const { mode } = useThemeStore.getState();
  const resolvedTheme = resolveTheme(mode);
  applyTheme(resolvedTheme);
  useThemeStore.setState({ resolvedTheme });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = () => {
    const currentMode = useThemeStore.getState().mode;
    if (currentMode === 'system') {
      const nextTheme = getSystemTheme();
      applyTheme(nextTheme);
      useThemeStore.setState({ resolvedTheme: nextTheme });
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}
