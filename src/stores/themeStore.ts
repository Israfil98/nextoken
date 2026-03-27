import { create } from 'zustand';

// We read the initial theme from localStorage so the user's
// preference persists across page reloads. If nothing is saved,
// we check if their OS prefers dark mode.
type TTheme = 'light' | 'dark';

interface IThemeStore {
  theme: TTheme;
  toggleTheme: () => void;
}

const getInitialTheme = (): TTheme => {
  const stored = localStorage.getItem('nextoken-theme');
  if (stored === 'light' || stored === 'dark') return stored;

  // Respect OS-level dark mode preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const useThemeStore = create<IThemeStore>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('nextoken-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return { theme: next };
    }),
}));
