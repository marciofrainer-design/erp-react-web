# Hotel ERP — Backend GraphQL

Backend em Node.js/TypeScript com Apollo Server e banco de dados SQLite para o sistema ERP de gerenciamento hoteleiro.

## Tecnologias

- **Apollo Server v5** — servidor GraphQL
- **Knex.js** — migrations e queries SQL
- **SQLite (better-sqlite3)** — banco de dados local
- **JWT** — autenticação via Bearer token
- **TypeScript** — tipagem estática
- **ts-node-dev** — execução em modo desenvolvimento

## Instalação

```bash
cd backend
npm install
```

## Configuração

Copie o `.env.example` para `.env`:

```bash
cp .env.example .env
```

Para testar **sem autenticação** (apenas desenvolvimento), edite o `.env` e descomente:

```
SKIP_AUTH=true
```

## Banco de Dados

### Executar migrations

```bash
npm run migrate
```

### Popular com dados de exemplo

```bash
npm run seed
```

### Setup completo (migrate + seed)

```bash
npm run setup
```

## Executar o servidor

### Desenvolvimento (com hot reload)

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000/`.

### Produção

```bash
npm run build
npm start
```

## GraphQL Playground

Acesse `http://localhost:3000/` no navegador para o GraphQL Playground.

> **Nota:** Se `SKIP_AUTH` não estiver ativo, você precisará fornecer um `Authorization: Bearer <token>` no cabeçalho. Use a mutation `login` para obter o token.

### Exemplo de login

```graphql
mutation {
  login(email: "admin@hotel.com", password: "admin123") {
    token
    user {
      name
      email
    }
  }
}
```

## Schemas e Entidades

### Entities disponíveis

| Entidade | Descrição |
|---|---|
| `Empresa` | Estabelecimentos hoteleiros |
| `Edificacao` | Edificações/blocos do hotel |
| `Andar` | Andares por edificação |
| `UhTipo` | Tipos de unidade habitacional |
| `UhClassificacao` | Classificações de UH |
| `Uh` | Unidades habitacionais |
| `Hospede` | Cadastro de hóspedes |
| `Reserva` | Reservas de UH |
| `CheckinCheckout` | Movimentações de check-in/check-out |

### Migrations

| Arquivo | Tabela |
|---|---|
| `20240101_01_create_empresa.ts` | `empresa` |
| `20240101_02_create_edificacao.ts` | `edificacao` |
| `20240101_03_create_andar.ts` | `andar` |
| `20240101_04_create_uhtipo.ts` | `uhtipo` |
| `20240101_05_create_uhclassificacao.ts` | `uhclassificacao` |
| `20240101_06_create_uh.ts` | `uh` |
| `20240101_07_create_caracteristica.ts` | `caracteristica`, `uh_caracteristica` |
| **`20240101_08_create_hospedes.ts`** | **`hospedes`** |
| **`20240101_09_create_reservas.ts`** | **`reservas`** |
| **`20240101_10_create_checkin_checkout.ts`** | **`checkin_checkout`** |

### Queries principais

```graphql
# Listar hóspedes com paginação e busca
query {
  hospedes(idempresa: 1, page: 1, limit: 20, search: "Carlos") {
    total
    items
  }
}

# Listar reservas por status
query {
  reservas(idempresa: 1, idstatus: 2) {
    total
    items
  }
}

# Check-ins ativos
query {
  checkinsAtivos(idempresa: 1) {
    total
    items
  }
}
```

### Mutations principais

```graphql
# Criar hóspede
mutation {
  criarHospede(input: {
    idempresa: 1
    nmhospede: "Maria Silva"
    cpf_cnpj: "111.222.333-44"
    email: "maria@email.com"
    telefone: "(11) 99999-8888"
  }) {
    idhospede
    nmhospede
  }
}

# Criar reserva
mutation {
  criarReserva(input: {
    idempresa: 1
    idhospede: 1
    iduh: 3
    dtentrada: "2024-12-20"
    dtsaida: "2024-12-25"
    nrpax: 2
    vldiaria: 350.00
    vltotal: 1750.00
  }) {
    idreserva
    nrreserva
    nmhospede
    cduh
    nmstatus
  }
}

# Realizar check-in
mutation {
  realizarCheckin(input: {
    idempresa: 1
    idreserva: 1
    idhospede: 1
    iduh: 3
    dtcheckin: "2024-12-20 14:00:00"
    nrpax: 2
  }) {
    idcheckin
    nmhospede
    cduh
    nrsituacao
  }
}

# Realizar checkout
mutation {
  realizarCheckout(input: {
    idcheckin: 1
    dtcheckout: "2024-12-25 11:00:00"
    vltotal: 1750.00
  }) {
    idcheckin
    nmhospede
    nrsituacao
    vltotal
  }
}
```
