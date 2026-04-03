export interface AuthUser {
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}