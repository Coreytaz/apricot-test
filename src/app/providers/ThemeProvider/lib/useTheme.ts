import { useContext, useEffect, useLayoutEffect } from 'react';

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme!);
  }, [theme]);

  useEffect(() => {
    const newTheme =
      localStorage.getItem(LOCAL_STORAGE_THEME_KEY) !== null
        ? (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme)
        : window.matchMedia?.('(prefers-color-scheme: dark)').matches
        ? Theme.DARK
        : Theme.LIGHT;

    setTheme!(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme!(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme: theme!,
    toggleTheme,
  };
}
