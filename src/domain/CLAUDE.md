# Convenções de Domínio — src/domain/

Cada entidade de negócio ocupa uma subpasta em `src/domain/`. A pasta representa o domínio, não a tela.

---

## Estrutura obrigatória por domínio

```
src/domain/{entity}/
├── types.ts                  # Tipo da entidade, colunas, label keys, dependências
├── consts.ts                 # Função blank{Entity} (objeto vazio padrão)
├── validation.ts             # Schema Zod + tipo inferido
├── {Entity}Repository.ts     # Acesso a dados, estende RepositoryBase
└── {Entity}Factory.ts        # Cria instâncias e agrega dependências
```

---

## `types.ts` — o que deve conter

```ts
import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import { WIDTH_STRING_COLUMN, WIDTH_INTEGER_COLUMN } from "@/consts";
import type { Repository } from "@/infra/interface/types";

// 1. Tipo da entidade — estende EntityBase
export type Andar = EntityBase & {
  idandar: number;
  nmandar: string;
  // ...demais campos do backend
};

// 2. Mapa de chaves de label para i18n (namespace do domínio)
export const ANDAR_LABEL_KEYS = {
  keyName: "crud.fields.keyName",
  nameLabel: "crud.fields.nameLabel",
} as const;

// 3. Definição de coluna com labelKey (sem label traduzido)
export type AndarColumnDefinition = Omit<Column<Andar>, "label"> & {
  labelKey: (typeof ANDAR_LABEL_KEYS)[keyof typeof ANDAR_LABEL_KEYS];
};

// 4. Array de colunas da tabela
export const AndarColumns: AndarColumnDefinition[] = [
  { labelKey: ANDAR_LABEL_KEYS.keyName, field: "idandar", width: WIDTH_INTEGER_COLUMN, type: FieldType.NUMBER },
  { labelKey: ANDAR_LABEL_KEYS.nameLabel, field: "nmandar", width: WIDTH_STRING_COLUMN, type: FieldType.STRING },
];

// 5. Tipo de dependências (usado pelo Factory)
export type AndarDependencies = {
  repository: Repository<Andar>;
  primaryKeyName: keyof Andar;
};
```

---

## `consts.ts` — objeto em branco

```ts
import type { Andar } from "@/domain/andar/types";

// Retorna um objeto vazio padrão para criação de novo registro
export const blankAndar = <T extends Andar>(): T =>
  ({
    idandar: 0,
    idempresa: 0,
    nmandar: "",
    cdandar: "",
    isativo: 1,
  } as T);
```

---

## `validation.ts` — schema Zod

```ts
import { z } from "zod";

export const andarRegisterSchema = z.object({
  nmandar: z.string().trim().min(3, "validation.nmandar.min").max(80, "validation.nmandar.max"),
  cdandar: z.string().trim().min(1, "validation.cdandar.required"),
});

// Tipo inferido do schema — use em formulários
export type AndarRegisterFormData = z.infer<typeof andarRegisterSchema>;
```

- Mensagens de validação são chaves i18n (ex: `"validation.nmandar.min"`), não strings em português.
- O schema valida apenas campos editáveis. Campos gerados pelo backend (ids, etc.) ficam de fora.

---

## `{Entity}Repository.ts` — acesso a dados

```ts
import { RepositoryBase } from "@/infra/repository/repositoryBase";
import { DataSnapAdapter } from "@/infra/api/service";
import type { Andar } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Andar"; // PascalCase, igual ao nome do controller no backend

export class AndarRepository extends RepositoryBase<Andar> {
  constructor(api: DataSnapAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
    // Resulta em: "TAndarController"
  }
}
```

- Nunca adicione lógica de negócio no Repository. Ele só faz operações CRUD via `RepositoryBase`.
- Se precisar de endpoints customizados, adicione métodos sobrescrevendo os de `RepositoryBase`.

---

## `{Entity}Factory.ts` — composição de dependências

```ts
import { DataSnapAdapter } from "@/infra/api/service";
import { AndarRepository } from "./AndarRepository";
import type { Andar } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankAndar } from "./consts";

export const AndarFactory = {
  createBlankAndar(): Andar {
    return blankAndar<Andar>();
  },
  dependencies(): CrudRegisterDependencies<Andar> {
    const adapter = new DataSnapAdapter();
    const repository = new AndarRepository(adapter);
    return { repository, primaryKeyName: "idandar" };
  },
};

export default AndarFactory;
```

- `primaryKeyName` deve ser o campo numérico único da entidade (nome do campo no frontend, não no banco).
- `createBlankAndar` retorna um objeto tipado com todos os campos inicializados.

---

## Regras

- O domínio não importa de `components/`, `pages/` ou `context/`.
- Pode importar de `@/types`, `@/consts`, `@/infra` e de outros domínios se houver dependência de dados.
- Nomes de arquivo em PascalCase para classes; camelCase para funções exportadas diretamente.
- Não crie um domínio para entidades que não são gerenciadas via CRUD (use `src/types/` para tipos simples).
