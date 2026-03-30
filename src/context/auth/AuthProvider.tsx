import { useMemo, useState } from "react";
import { AuthContext, type AuthUser, type AuthContextType } from "./AuthContext";

const AUTH_STORAGE_KEY = "auth-user-email";

function loadStoredUser(): AuthUser | null {
  const email = localStorage.getItem(AUTH_STORAGE_KEY);
  return email ? { email } : null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => loadStoredUser());

  const login = (email: string) => {
    const authUser: AuthUser = { email };
    localStorage.setItem(AUTH_STORAGE_KEY, email);
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
