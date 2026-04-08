import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, AuthProviderProps } from "./types";
import { apiClient } from "@/infra/api/client";
import { IS_MOCK_MODE } from "@/infra/factories/adapterFactory";
import { mockAuthRoutes } from "@/mocks/auth/authMocks";
import {
  clearStoredAuthSession,
  loadStoredAuthSession,
  saveStoredAuthSession,
} from "./storage";
import { setSelectedEmpresaId } from "../empresa/empresaSelection";

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState(() => loadStoredAuthSession());
  const [isLoading, setIsLoading] = useState(false);

  const login: AuthContextType["login"] = async (login, password) => {
    setIsLoading(true);

    try {
      let data;

      if (IS_MOCK_MODE) {
        data = mockAuthRoutes.Login({ login, password });
      } else {
        const response = await apiClient.post("/TAuthController/Login", {
          login,
          password,
        });
        data = response.data;
      }

      saveStoredAuthSession(data);
      setSession(data);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearStoredAuthSession();
    setSelectedEmpresaId(null);
    setSession(null);
  };

  const value: AuthContextType = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: session !== null,
      isLoading,
      login,
      logout,
    }),
    [isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
