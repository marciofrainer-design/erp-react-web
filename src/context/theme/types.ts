export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
