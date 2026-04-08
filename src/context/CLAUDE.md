# Convenções de Contextos — src/context/

Cada contexto React segue um padrão de 5 arquivos. Não crie contextos para estado local de componente — use `useState`. Contextos são para estado global compartilhado entre árvores de componentes distantes.

---

## Estrutura obrigatória por contexto

```
src/context/{name}/
├── types.ts           # Interfaces: {Name}ContextType, {Name}ProviderProps + tipos de dados
├── {Name}Context.ts   # Criação do contexto com createContext
├── {Name}Provider.tsx # Componente provider com lógica de estado
├── use{Name}.ts       # Hook de consumo com validação
└── storage.ts         # (opcional) Utilitários de persistência em localStorage
```

Arquivo extra quando necessário:
- `consts.ts` — chaves de localStorage, valores padrão
- `{name}Selection.ts` — lógica de seleção persistida (ex: `empresaSelection.ts`)

---

## `types.ts`

```ts
// Tipo do valor do contexto
export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (login: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

// Props do provider
export interface AuthProviderProps {
  children: React.ReactNode;
}

// Tipos de dados do domínio do contexto
export interface AuthUser {
  idusuario: number;
  login: string;
  nmusuario: string;
}
```

---

## `{Name}Context.ts`

```ts
import { createContext } from "react";
import type { AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

- Sempre inicialize com `undefined` — o hook de consumo valida isso.
- Nunca defina valor padrão diferente de `undefined`.

---

## `{Name}Provider.tsx`

```tsx
import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, AuthProviderProps } from "./types";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Agrupe o valor com useMemo para evitar re-renders desnecessários
  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      // ...
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

---

## `use{Name}.ts` — hook de consumo

```ts
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
```

- Sempre lance erro se o contexto for `undefined`.
- Mensagem de erro no padrão: `"use{Name} must be used within a {Name}Provider"`.

---

## `storage.ts` — persistência (opcional)

```ts
import { AUTH_STORAGE_KEY } from "./consts";
import type { AuthSession } from "./types";

export function loadStoredAuthSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function saveStoredAuthSession(session: AuthSession): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredAuthSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
```

---

## Registro no `App.tsx`

Providers são registrados em `src/App.tsx` na ordem correta de dependência (externos envolvem internos):

```tsx
<ThemeProvider>
  <AuthProvider>
    <ConfirmDialogProvider>
      <EmpresaProvider>
        <I18nextProvider i18n={i18n}>
          <AppRouter />
        </I18nextProvider>
      </EmpresaProvider>
    </ConfirmDialogProvider>
  </AuthProvider>
</ThemeProvider>
```

---

## Regras

- Um contexto por responsabilidade. Não misture auth com tema.
- Providers não fazem chamadas de API diretamente — delegam para serviços ou usam `apiClient`.
- O hook `use{Name}` é o único ponto de consumo do contexto — nunca use `useContext(XyzContext)` fora do hook.
- `storage.ts` sempre trata erros de parsing com `try/catch` retornando `null`.
- Contextos não importam de `pages/` ou `components/crud/`.
