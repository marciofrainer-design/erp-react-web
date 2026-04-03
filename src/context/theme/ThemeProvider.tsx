import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeMode, ThemeContextType, ThemeProviderProps } from './types';
import { THEME_STORAGE_KEY } from './consts';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (saved) return saved;

    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }

    return 'dark';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [mode]);

  const value: ThemeContextType = {
    mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
