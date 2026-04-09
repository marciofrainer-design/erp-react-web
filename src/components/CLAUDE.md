# Convenções de Componentes — src/components/

---

## Hierarquia de componentes

```
src/components/
├── ui/           # Primitivos de UI sem lógica (shadcn/Radix)
├── {categoria}/  # Componentes genéricos por categoria (button, inputs, table…)
│   ├── {Name}Base.tsx    # Componente base reutilizável
│   └── types.ts          # Props do componente
└── domain/       # Componentes que consomem domínios específicos
    └── select{Entity}/   # Ex: selectEmpresa
```

### Regra de camadas (de baixo para cima)

```
ui/  →  *Base  →  domain/  →  pages/
```

- `ui/` não importa de lugar nenhum dentro de `src/`
- `*Base` importa de `ui/` e `@/types`
- `domain/` importa de `*Base` e do domínio correspondente
- `pages/` compõe tudo — nunca o contrário

---

## Sufixo `Base`

Use o sufixo `Base` em componentes genéricos que:
- Não têm dependência de domínio de negócio
- Podem ser reutilizados em qualquer contexto
- Recebem toda sua configuração por props

```ts
// ✅ genérico, reutilizável
export function ButtonBase({ label, onClick, Icon, disabled }: ButtonBaseProps) {}
export function InputStringBase({ label, value, onChange }: InputStringBaseProps) {}
export function TableBase({ columns, data, onRowClick }: TableBaseProps<T>) {}

// ❌ não é Base — está acoplado ao domínio
export function AndarTableBase() {} // use AndarTable ou diretamente na página
```

### Componentes shadcn/ui — obrigatório criar um `*Base`

**Sempre que um componente de `ui/` (shadcn/Radix) for utilizado em mais de um lugar, crie um componente `*Base` intermediário** que encapsula o estilo padrão do projeto (Tailwind, tokens de cor) e expõe uma API simplificada via props e `children`.

Nunca use primitivos de `ui/` diretamente em páginas, componentes de domínio ou outros `*Base`. A camada `ui/` é acesso exclusivo dos componentes `*Base`.

```ts
// ✅ correto — SelectBase encapsula ui/select e expõe children
// components/select/SelectBase.tsx
const SelectBase = ({ label, Icon, error, children, ...selectProps }: SelectBaseProps) => (
  <div className="flex flex-col gap-1 w-full">
    ...
    <Select {...selectProps}>{children}</Select>
    ...
  </div>
);

// ✅ uso em domínio ou página
<SelectBase label="Empresa" Icon={Building2}>
  <SelectTrigger>...</SelectTrigger>
  <SelectContent>...</SelectContent>
</SelectBase>

// ❌ errado — ui/select usado diretamente em página ou domínio
import { Select, SelectTrigger } from "@/components/ui/select";
```

Siga o mesmo padrão para qualquer primitivo shadcn: `DialogBase`, `SheetBase`, `TooltipBase`, `PopoverBase`, etc.

---

## Arquivo `types.ts`

Cada pasta de componente deve ter um `types.ts` com todos os tipos de props:

```ts
// components/button/types.ts
import type { LucideIcon } from "lucide-react";

export type ButtonBaseProps = {
  label: string;
  onClick?: () => void;
  Icon?: LucideIcon;
  disabled?: boolean;
  hidden?: boolean;
};
```

- Nomeie como `{ComponentName}Props`
- Não exporte tipos de domínio de dentro de `components/` — importe-os de `@/domain/` ou `@/types`

---

## Componentes de domínio (`components/domain/`)

Componentes que têm conhecimento de uma entidade específica ficam em `components/domain/`:

```
components/domain/
└── selectEmpresa/
    ├── SelectEmpresa.tsx   # Componente principal
    └── types.ts            # Props específicas
```

- Nomeados sem sufixo `Base`
- Podem importar do domínio correspondente e do contexto

---

## Exportações

- Use `index.ts` na raiz de `components/` apenas para membros consumidos por `pages/` ou `hooks/`
- Subpastas com múltiplos arquivos podem ter seu próprio `index.ts`

---

## Regras

- Componentes não acessam a API diretamente — recebem dados e callbacks por props
- Componentes não importam de `pages/`
- Estado global (context, store) só é consumido em componentes de nível de página ou hooks, não em componentes `Base`
- Ícones sempre via `lucide-react`, tipados como `LucideIcon`
