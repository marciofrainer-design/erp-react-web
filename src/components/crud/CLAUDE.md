# Convenções de CRUD — src/components/crud/

O framework CRUD é o padrão para todas as telas de cadastro da aplicação. Ele cobre listagem, pesquisa, formulário de criação/edição/clone e exclusão, com paginação server-side.

---

## Arquitetura do CRUD

```
CrudPage (orquestrador)
├── useCrud (hook — src/hooks/useCrud.ts)
├── CrudPageTemplate (layout: título + search + tabela + formulário + toolbar)
│   ├── CrudSearch (campo de pesquisa)
│   ├── CrudTable (tabela paginada)
│   ├── CrudRegister (container do formulário)
│   └── CrudToolbar (rodapé com botões de ação)
```

---

## Como criar um novo CRUD

### 1. Domínio (`src/domain/{entity}/`)

Crie os 5 arquivos obrigatórios — ver `src/domain/CLAUDE.md`.

### 2. Traduções (`src/i18n/resources/`)

Adicione o namespace em cada idioma — ver `src/i18n/CLAUDE.md`.
Registre o namespace em `src/i18n/resources/index.ts` e em `src/i18n/namespaces.ts`.

### 3. Formulário de registro (`src/pages/{entity}/{Entity}Register.tsx`)

```tsx
import { CrudRegister } from "@/components/crud";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { {entity}RegisterSchema } from "@/domain/{entity}/validation";
import type { {Entity}RegisterProps } from "./types";
import { useEffect, useRef } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";

export function {Entity}Register({ data, onChange }: {Entity}RegisterProps) {
  const { t } = useAppTranslation("{entity}");
  const validation = {entity}RegisterSchema.safeParse(data);
  const errors = validation.success
    ? {}
    : validation.error.issues.reduce<Record<string, string[]>>((acc, issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          const translatedMessage = t(issue.message, issue.message) as string;
          (acc[field] ??= []).push(translatedMessage);
        }
        return acc;
      }, {});

  const firstField = useRef<HTMLInputElement>(null);
  useEffect(() => { firstField.current?.focus(); }, []);

  return (
    <CrudRegister title={t("crud.title")} description={t("crud.subtitle")}>
      <InputStringBase
        ref={firstField}
        label={t("crud.fields.nameLabel")}
        value={data.nm{entity} ?? ""}
        onChange={(e) => onChange("nm{entity}", e.target.value)}
        errors={errors["nm{entity}"]}
      />
      {/* demais campos */}
    </CrudRegister>
  );
}
```

### 4. Tipos da página (`src/pages/{entity}/types.ts`)

```ts
import type { {Entity} } from "@/domain/{entity}/types";

export type {Entity}RegisterProps = {
  data: {Entity};
  mode?: "view" | "new" | "clone";
  onChange: <K extends keyof {Entity}>(field: K, value: {Entity}[K]) => void;
};
```

### 5. Página (`src/pages/{entity}/{Entity}Page.tsx`)

```tsx
import { CrudPage } from "@/components/crud/CrudPage";
import { {Entity}Register } from "./{Entity}Register";
import {Entity}Factory from "@/domain/{entity}/{Entity}Factory";
import { {Entity}Columns } from "@/domain/{entity}/types";
import { {entity}RegisterSchema } from "@/domain/{entity}/validation";

export function {Entity}Page() {
  return (
    <CrudPage
      title="{Título da tela}"
      pageDescription="{Descrição breve}"
      tableColumns={{Entity}Columns}
      createNewItem={{Entity}Factory.createBlank{Entity}}
      dependencies={{Entity}Factory.dependencies()}
      validate={(data) => {entity}RegisterSchema.safeParse(data).success}
      register={({ mode, data, onChange }) => (
        <{Entity}Register mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
```

---

## Modos do CRUD

| Modo | Descrição | Toolbar exibe |
|---|---|---|
| `table` | Listagem com pesquisa | Novo, Visualizar, Clonar, Excluir, Imprimir |
| `view` | Edição de registro existente | Salvar, Cancelar |
| `new` | Criação de novo registro | Salvar, Cancelar |
| `clone` | Cópia de registro existente | Salvar, Cancelar |

---

## Props de `CrudPage`

| Prop | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | `string` | ✅ | Título da tela |
| `pageDescription` | `string` | — | Subtítulo/descrição |
| `tableColumns` | `Column<T>[]` | ✅ | Definição das colunas |
| `createNewItem` | `() => T` | ✅ | Fábrica de objeto vazio |
| `dependencies` | `CrudRegisterDependencies<T>` | ✅ | Repository + primaryKeyName |
| `validate` | `(data: T) => boolean` | — | Validação do formulário |
| `register` | `(props) => ReactNode` | — | Formulário de edição |

---

## Colunas da tabela

Colunas são definidas em `src/domain/{entity}/types.ts` usando `{Entity}ColumnDefinition`:

```ts
export const {Entity}Columns: {Entity}ColumnDefinition[] = [
  { labelKey: ENTITY_LABEL_KEYS.keyName,   field: "id{entity}", width: WIDTH_INTEGER_COLUMN, type: FieldType.NUMBER },
  { labelKey: ENTITY_LABEL_KEYS.nameLabel, field: "nm{entity}", width: WIDTH_STRING_COLUMN,  type: FieldType.STRING },
  { labelKey: ENTITY_LABEL_KEYS.situation, field: "isativo",    width: WIDTH_BOOLEAN_COLUMN, type: FieldType.BOOLEAN },
];
```

**Larguras disponíveis** (de `src/consts/index.ts`):

| Constante | Tailwind | Uso |
|---|---|---|
| `WIDTH_INTEGER_COLUMN` | `w-18` | IDs, números curtos |
| `WIDTH_SHORTSTRING_COLUMN` | `w-18` | Códigos, siglas |
| `WIDTH_STRING_COLUMN` | `w-80` | Nomes, descrições |
| `WIDTH_DATE_COLUMN` | `w-32` | Datas |
| `WIDTH_BOOLEAN_COLUMN` | `w-12` | Flags booleanas |

---

## Traduções obrigatórias no namespace do CRUD

O namespace `crud` deve conter ao menos:

```json
{
  "new": "Novo",
  "view": "Visualizar",
  "clone": "Clonar",
  "delete": "Excluir",
  "print": "Imprimir",
  "close": "Fechar",
  "cancel": "Cancelar",
  "save": "Salvar",
  "formValid": "Formulário válido",
  "formInvalid": "Formulário inválido",
  "notifications": {
    "loadingData": "...",
    "preparingData": "...",
    "loadingDataError": "...",
    "deleteSuccess": "...",
    "deleteError": "...",
    "deleteCancelled": "...",
    "savingSuccess": "...",
    "savingError": "...",
    "formInvalid": "...",
    "printReport": "...",
    "invalidRepositoryConfig": "...",
    "invalidPrimaryKey": "...",
    "missingPrimaryKeyValue": "..."
  },
  "confirmations": {
    "deleteTitle": "...",
    "deleteDescription": "...",
    "deleteConfirmText": "...",
    "deleteCancelText": "...",
    "cancelTitle": "...",
    "cancelDescription": "...",
    "cancelConfirmText": "...",
    "cancelCancelText": "...",
    "saveTitle": "...",
    "saveDescription": "...",
    "saveConfirmText": "...",
    "saveCancelText": "..."
  }
}
```

---

## Regras

- Nunca chame a API diretamente de uma página — sempre via `Factory.dependencies()` + `CrudPage`.
- O `primaryKeyName` deve ser o campo `id` numérico principal da entidade no frontend.
- O `register` prop recebe `{ mode, data, onChange }` — não use estado local para o formulário; use `onChange`.
- Não adicione lógica de negócio dentro de `{Entity}Register` — valide com Zod via `validate` prop do `CrudPage`.
- Campos somente leitura em modo `view` devem ser desabilitados via `disabled={mode === "view"}`.
- Use `useRef` + `useEffect` para focar o primeiro campo ao abrir o formulário.
