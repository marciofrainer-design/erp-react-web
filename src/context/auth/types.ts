export interface AuthUser {
  idusuario: number;
  login: string;
  nmusuario: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface AuthLoginPayload {
  login: string;
  password: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (login: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}