# Convenções de Infraestrutura — src/infra/

Camada responsável pela comunicação com APIs externas. Domínios e páginas nunca acessam `apiClient` diretamente — sempre passam por um Repository.

---

## Estrutura

```
src/infra/
├── api/
│   ├── client.ts         # Instância axios configurada (interceptors de auth e 401)
│   ├── consts.ts         # API_BASE_PATH, API_TIMEOUT, ControllerPrefix, ControllerSuffix
│   ├── service.ts        # DataSnapAdapter — implementa ApiAdapter
│   └── types.ts          # Tipos específicos da API DataSnap
├── interface/
│   ├── index.ts          # Exporta ApiAdapter
│   └── types.ts          # Repository<T>, PaginatedResponse<T>, PaginationQueryParams
├── repository/
│   └── repositoryBase.ts # Classe base para todos os repositories
└── factories/
    └── dependenciesFactory.ts
```

---

## `ApiAdapter` — contrato de comunicação

```ts
// interface/types.ts
export interface ApiAdapter {
  get<T>(controller: string, method: string, params?: object): Promise<T>;
  post<T>(controller: string, method: string, data?: unknown): Promise<T>;
  put<T>(controller: string, method: string, data?: unknown): Promise<T>;
  delete<T>(controller: string, method: string, id: number): Promise<T>;
}
```

Nunca acople repositories ao `axios` diretamente — sempre via `ApiAdapter`.

---

## `RepositoryBase<T>` — classe base

```ts
export class RepositoryBase<T> implements Repository<T> {
  constructor(api: ApiAdapter, controller: string) {}

  getAll(params: PaginationQueryParams): Promise<PaginatedResponse<T>>
  getById(id: number): Promise<T>
  save(data: T): Promise<void>
  update(data: T): Promise<void>
  delete(id: number): Promise<void>
}
```

Todos os repositories de domínio estendem `RepositoryBase<T>`.

---

## `Repository<T>` — interface

```ts
// interface/types.ts
export interface Repository<T> {
  getAll(params: PaginationQueryParams): Promise<PaginatedResponse<T>>;
  getById(id: number): Promise<T>;
  save(data: T): Promise<void>;
  update(data: T): Promise<void>;
  delete(id: number): Promise<void>;
}

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageCount: number;
};

export type PaginationQueryParams = {
  page: number;
  pageCount: number;
  limit: number;
};
```

---

## Naming convention dos controllers

O nome do controller no backend segue o padrão DataSnap:

```ts
// src/consts/index.ts
export const ControllerPrefix = "T";
export const ControllerSuffix = "Controller";

// Uso no repository
const typeName = "Andar"; // sempre PascalCase, igual ao nome da entidade
super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
// Resulta em: "TAndarController"
```

---

## `client.ts` — interceptors

O `apiClient` (axios) já possui:
- **Interceptor de request**: injeta `Authorization: Bearer {token}` automaticamente
- **Interceptor de response**: em status 401, limpa a sessão e redireciona para `/tools/login`

Não adicione lógica de autenticação em repositories — o `client.ts` centraliza isso.

---

## Criando um novo Repository

```ts
// src/domain/{entity}/{Entity}Repository.ts
import { RepositoryBase } from "@/infra/repository/repositoryBase";
import { DataSnapAdapter } from "@/infra/api/service";
import type { {Entity} } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "{Entity}"; // PascalCase

export class {Entity}Repository extends RepositoryBase<{Entity}> {
  constructor(api: DataSnapAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }

  // Sobrescreva métodos apenas se o endpoint customizado for necessário
}
```

---

## Regras

- Repositories ficam em `src/domain/{entity}/`, não em `src/infra/repository/`.
- `src/infra/repository/` contém apenas `RepositoryBase` — a base genérica.
- Nunca exporte `apiClient` de `infra/` para uso direto em componentes ou páginas. Use sempre um repository.
- Se precisar de um endpoint que não é CRUD (ex: relatório, export), adicione o método no repository correspondente.
- `DataSnapAdapter` é a implementação concreta da API. Se a API mudar, apenas este arquivo muda.
