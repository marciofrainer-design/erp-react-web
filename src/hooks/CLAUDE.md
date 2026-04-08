# Convenções de Hooks — src/hooks/

---

## O que vai aqui

Hooks customizados que:
- Encapsulam lógica de estado reutilizável entre múltiplos componentes
- Não pertencem exclusivamente a um único domínio ou contexto
- São consumidos por componentes e páginas

Hooks que pertencem exclusivamente a um contexto ficam na pasta do contexto (ex: `src/context/auth/useAuth.ts`) e são reexportados aqui apenas se conveniente.

---

## Nomenclatura e extensão

- Sempre prefixo `use`: `useCrud`, `useNotify`, `useConfirm`
- Extensão `.ts` (sem JSX)
- Um hook por arquivo
- Nome do arquivo igual ao nome da função exportada: `useCrud.ts` → `export function useCrud()`

---

## Exportação via `index.ts`

Todo hook deve ser exportado pelo barrel `src/hooks/index.ts`:

```ts
export { useNotify } from "./useNotify";
export { useConfirm } from "@/context/modal/confirm/useConfirm";
export { useTranslatedColumns } from "./useTranslatedColumns";
export { useCrud } from "./useCrud";
```

Componentes e páginas importam sempre via `@/hooks`:

```ts
// ✅
import { useCrud, useNotify } from "@/hooks";

// ❌
import { useCrud } from "@/hooks/useCrud";
```

---

## Estrutura de um hook

```ts
import { useState, useCallback } from "react";

// Tipos de entrada como objeto nomeado quando há mais de 1 parâmetro
type UseExampleOptions = {
  initialValue: string;
  onSuccess?: () => void;
};

export function useExample({ initialValue, onSuccess }: UseExampleOptions) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((next: string) => {
    setValue(next);
    onSuccess?.();
  }, [onSuccess]);

  return { value, handleChange };
}
```

---

## Hooks existentes

| Hook | Localização do arquivo | Descrição |
|---|---|---|
| `useCrud` | `hooks/useCrud.ts` | Gerencia todo o estado e handlers de uma tela CRUD |
| `useNotify` | `hooks/useNotify.ts` | Exibe notificações (success, error, warning, info) via sonner |
| `useConfirm` | `context/modal/confirm/useConfirm.ts` | Exibe diálogo de confirmação com await |
| `useTranslatedColumns` | `hooks/useTranslatedColumns.ts` | Traduz `labelKey` das colunas para `label` usando i18n |
| `useAuth` | `context/auth/useAuth.ts` | Acessa session, login, logout |
| `useEmpresa` | `context/empresa/useEmpresa.ts` | Acessa empresa selecionada |
| `useTheme` | `context/theme/useTheme.ts` | Acessa e altera o tema |
| `useAppTranslation` | `i18n/useAppTranslation.ts` | Wrapper tipado do `useTranslation` do react-i18next |

---

## Regras

- Hooks não retornam JSX — para isso, crie um componente.
- Hooks não fazem chamadas de API diretamente — delegam para repositories ou `apiClient`.
- Hooks que encapsulam um contexto específico ficam na pasta do contexto, não aqui.
- Não crie hooks só para extrair 2 linhas de um componente — justifique pela reutilização.
- Mantenha o `index.ts` atualizado ao adicionar novos hooks.
