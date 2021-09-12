import React, { createContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

// Set this to 'light if you want to use light theme as the default
const DEFAULT_THEME: Theme = 'dark';

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs as Theme;
    }
  }
  return DEFAULT_THEME;
}

function setPageTheme(theme: Theme) {
  const root = window.document.documentElement;
  const isDark = theme === 'dark';

  root.classList.remove(isDark ? 'light' : 'dark');
  root.classList.add(theme);

  localStorage.setItem('color-theme', theme);
}

export const ThemeContext = createContext({
  theme: DEFAULT_THEME as Theme,
  setTheme: (_theme: Theme) => {
    /* noop */
  },
});

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => setPageTheme(theme), [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
