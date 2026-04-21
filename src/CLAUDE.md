# Convenções Globais — src/

## Alias de importação

- Sempre use `@/` para importar a partir de `src/`. Nunca use caminhos relativos `../` para subir de pasta.
- Exceção: imports dentro da mesma pasta podem usar `./`.
- Alias secundário: `@infra/` aponta para `src/infra/`.

```ts
// ✅ correto
import { useAuth } from "@/context/auth/useAuth";
import { AndarRepository } from "./AndarRepository";

// ❌ errado
import { useAuth } from "../../context/auth/useAuth";
```

---

## Nomenclatura de arquivos

| O que é | Padrão | Exemplo |
|---|---|---|
| Componente React | PascalCase `.tsx` | `AndarPage.tsx`, `ButtonBase.tsx` |
| Hook | `use` + camelCase `.ts` | `useCrud.ts`, `useAuth.ts` |
| Contexto | `{Name}Context.ts` | `AuthContext.ts` |
| Provider | `{Name}Provider.tsx` | `AuthProvider.tsx` |
| Repositório | `{Entity}Repository.ts` | `AndarRepository.ts` |
| Factory | `{Entity}Factory.ts` | `AndarFactory.ts` |
| Tipos e interfaces | `types.ts` | `src/domain/andar/types.ts` |
| Constantes | `consts.ts` | `src/domain/andar/consts.ts` |
| Validação (Zod) | `validation.ts` | `src/domain/andar/validation.ts` |
| Barrel export | `index.ts` | `src/hooks/index.ts` |
| Storage/persistência | `storage.ts` | `src/context/auth/storage.ts` |

---

## Nomenclatura de símbolos

| O que é | Padrão | Exemplo |
|---|---|---|
| Componente React | PascalCase | `AndarPage`, `CrudToolbar` |
| Hook | `use` + PascalCase | `useCrud`, `useAppTranslation` |
| Props de componente | `{Name}Props` | `CrudPageProps`, `ButtonBaseProps` |
| Tipo de contexto | `{Name}ContextType` | `AuthContextType` |
| Props de provider | `{Name}ProviderProps` | `AuthProviderProps` |
| Entidade de domínio | PascalCase | `Andar`, `AuthUser` |
| Tipo de formulário | `{Entity}RegisterFormData` | `AndarRegisterFormData` |
| Dependências | `{Entity}Dependencies` | `AndarDependencies` |
| Constantes | UPPER_SNAKE_CASE | `AUTH_STORAGE_KEY`, `CRUD_DEFAULT_LIMIT` |
| Handlers | `handle` + PascalCase | `handleSearch`, `handleRowClick` |
| Factories (métodos) | `create` + PascalCase | `createBlankAndar` |

---

## Estrutura de pastas

```
src/
├── app/          # Setup da aplicação: router, providers globais, store
├── components/   # Componentes reutilizáveis (ver components/CLAUDE.md)
├── consts/       # Constantes globais compartilhadas entre camadas
├── context/      # Contextos React (ver context/CLAUDE.md)
├── domain/       # Lógica de negócio por entidade (ver domain/CLAUDE.md)
├── hooks/        # Custom hooks (ver hooks/CLAUDE.md)
├── i18n/         # Internacionalização (ver i18n/CLAUDE.md)
├── infra/        # Camada de infraestrutura: API, repositories (ver infra/CLAUDE.md)
├── lib/          # Wrappers de bibliotecas externas
├── pages/        # Páginas da aplicação (composição de componentes)
├── types/        # Tipos globais compartilhados (Column, EntityBase, FieldType)
└── utils/        # Funções utilitárias puras sem estado React
```

---

## Barrel exports (`index.ts`)

- Toda pasta pública deve ter `index.ts` exportando seus membros públicos.
- Não reexporte tudo indiscriminadamente — exporte apenas o que outras camadas precisam consumir.
- Pastas folha (sem subpastas) podem omitir o `index.ts`.

---

## Extensões de arquivo

- `.tsx` — arquivos que contêm JSX
- `.ts` — lógica pura TypeScript sem JSX
- Nunca misture: hooks sem JSX devem ser `.ts`, não `.tsx`

---

## Regras gerais

- Prefira `export function` nomeado. Evite `export default` exceto em páginas de nível de rota.
- Componentes base/genéricos usam sufixo `Base` (ex: `ButtonBase`, `InputBase`).
- Primitivos de UI sem lógica ficam em `components/ui/`.
- Nunca importe de `pages/` dentro de `components/` ou `domain/`.
- Nunca importe de `components/` dentro de `domain/` ou `infra/`.
