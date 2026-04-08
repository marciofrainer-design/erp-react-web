# Convenções de Internacionalização — src/i18n/

---

## Idiomas suportados

| Código | Idioma | Arquivo base |
|---|---|---|
| `pt-BR` | Português (Brasil) — **padrão** | `resources/pt-BR/` |
| `en-US` | Inglês | `resources/en-US/` |
| `es-ES` | Espanhol | `resources/es-ES/` |

O idioma padrão (`fallbackLng`) é `pt-BR`, definido em `src/i18n/resources/index.ts`.

---

## Estrutura de arquivos

```
src/i18n/
├── index.ts                  # Configuração do i18next
├── namespaces.ts             # Array NAMESPACES e tipo AppNamespace
├── useAppTranslation.ts      # Hook tipado (wrapper de useTranslation)
├── react-i18next.d.ts        # Declaração de tipos para autocompletar chaves
└── resources/
    ├── index.ts              # Importa e exporta todos os recursos + fallbackLng + defaultNS
    ├── pt-BR/
    │   ├── common.ts         # Termos globais
    │   ├── login.ts          # Tela de login
    │   ├── tools.ts          # Página de ferramentas
    │   ├── crud.ts           # Textos do framework CRUD
    │   └── {entity}.ts       # Namespace por entidade de domínio
    ├── en-US/
    │   └── (mesmos arquivos)
    └── es-ES/
        └── (mesmos arquivos)
```

---

## Um namespace por feature/domínio

| Namespace | Uso |
|---|---|
| `common` | Termos globais (app.name, status, actions…) |
| `login` | Tela de login |
| `tools` | Layout principal e navegação |
| `crud` | Textos do framework CRUD (botões, notificações, confirmações) |
| `{entity}` | Textos específicos de cada entidade (ex: `andar`, `reserva`) |

---

## Adicionando um namespace novo

### 1. Criar o arquivo de recurso em cada idioma

```ts
// src/i18n/resources/pt-BR/{entity}.ts
const ptBR{Entity} = {
  crud: {
    title: "Cadastro de {Entity}",
    subtitle: "Gerencie os registros de {entity}.",
    fields: {
      keyName: "Id",
      nameLabel: "Nome",
      situation: "Sit.",
      company: "Estab.",
    },
  },
  validation: {
    nm{entity}: {
      min: "Nome deve ter ao menos 3 caracteres",
      max: "Nome deve ter no máximo 80 caracteres",
    },
  },
} as const;

export default ptBR{Entity};
```

### 2. Registrar no `resources/index.ts`

```ts
import ptBR{Entity} from "./pt-BR/{entity}";
import enUS{Entity} from "./en-US/{entity}";
import esES{Entity} from "./es-ES/{entity}";

export const resources = {
  "pt-BR": { ..., {entity}: ptBR{Entity} },
  "en-US": { ..., {entity}: enUS{Entity} },
  "es-ES": { ..., {entity}: esES{Entity} },
} as const;
```

### 3. Registrar no `namespaces.ts`

```ts
export const NAMESPACES = ["common", "tools", "login", "crud", "andar", "{entity}"] as const;
export type AppNamespace = (typeof NAMESPACES)[number];
```

---

## Como usar traduções

```ts
// Namespace único
const { t } = useAppTranslation("andar");
t("crud.title");           // ✅
t("crud.fields.nameLabel"); // ✅

// Múltiplos namespaces
const { t } = useAppTranslation(["tools", "common"]);
t("app.name", { ns: "common" }); // especifique ns quando usar múltiplos
```

---

## Estrutura de chaves obrigatórias por namespace de entidade

```ts
{
  crud: {
    title: string,        // título da tela de cadastro
    subtitle: string,     // descrição da tela
    fields: {
      keyName: string,    // label da coluna de ID
      nameLabel: string,  // label do campo nome
      situation: string,  // label do campo situação (isativo)
      company: string,    // label do campo empresa
      // demais campos...
    }
  },
  validation: {
    // chaves correspondentes às mensagens do schema Zod
    // ex: "validation.nmandar.min" → { nmandar: { min: "..." } }
  }
}
```

---

## Regras

- Chaves de validação Zod são referências i18n: ex `"validation.nmandar.min"` — nunca texto direto.
- As mesmas chaves devem existir em todos os 3 idiomas. Chaves faltantes causam fallback para `pt-BR`.
- Arquivos de recurso são `.ts` (com `as const`) para inferência de tipos — nunca `.json` puro sem importação.
- O `defaultNS` é `"common"` — ao chamar `t("app.name")` sem namespace, busca em `common`.
- Não use `t()` fora de componentes React ou hooks — i18n não funciona fora do ciclo React.
