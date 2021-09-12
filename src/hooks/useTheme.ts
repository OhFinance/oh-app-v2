import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'dark' | 'light';

// Set this to 'light if you want to use light theme as the default
const DEFAULT_THEME: Theme = 'dark';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage('color-theme', DEFAULT_THEME);
  useEffect(() => {
    if (window === undefined) {
      return;
    }
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
