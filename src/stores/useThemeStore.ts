import createStore from 'zustand';
import { combine } from 'zustand/middleware';

export type Theme = 'dark' | 'light';

// Set this to 'light' if you want to use light theme as the default
export const DEFAULT_THEME: Theme = 'dark';

const initialState = {
  theme: DEFAULT_THEME as Theme,
};

export const useThemeStore = createStore(
  combine(initialState, (set, get) => ({
    setTheme: (theme: Theme) => {
      if (get().theme !== theme) {
        set({ theme });
      }
    },
  }))
);

useThemeStore.subscribe(({ theme }) => {
  // store user preference in local storage
  window.localStorage.setItem('color-theme', theme);

  // set theme class on top level component
  const root = window.document.documentElement;
  const isDark = theme === 'dark';
  root.classList.remove(isDark ? 'light' : 'dark');
  root.classList.add(theme);
});

type State = ReturnType<typeof useThemeStore['getState']>;

export function selectSetTheme(state: State) {
  return state.setTheme;
}
