import type { LucideIcon } from "lucide-react";
import type { Repository } from "@/infra/interface/types";

/**
 * Define como um item T é mapeado para uma opção exibida no select.
 */
export type SelectOptionMapper<T> = {
  /** Campo de T cujo valor será emitido no onChange (ex: "iduhtipo") */
  valueKey: keyof T;
  /**
   * Um ou mais campos de T a exibir como rótulo na lista de opções.
   * Quando múltiplos campos são informados, são separados por " — ".
   */
  labelKeys: (keyof T)[];
  /**
   * Campo de T a exibir no trigger quando uma opção está selecionada.
   * Se omitido, usa o primeiro item de labelKeys.
   */
  triggerLabelKey?: keyof T;
};

/**
 * Função opcional de filtro personalizado.
 * Recebe o item e o texto digitado e retorna true se deve ser exibido.
 */
export type SelectFilterFn<T> = (item: T, search: string) => boolean;

export type SelectRepositoryProps<T> = {
  /** Repositório de dados injetado externamente */
  repository: Repository<T>;
  /** Mapeamento de campos do item para a opção do select */
  mapper: SelectOptionMapper<T>;
  /** Rótulo exibido acima do campo */
  label: string;
  /** Ícone opcional exibido à esquerda do trigger */
  Icon?: LucideIcon;
  /** Valor atualmente selecionado (controlado) */
  value?: string;
  /** Callback disparado ao selecionar um item; recebe o valor em string */
  onChange: (value: string) => void;
  /** Mostra o campo de busca/filtro na lista de opções (padrão: true) */
  searchable?: boolean;
  /** Placeholder do campo de busca */
  searchPlaceholder?: string;
  /** Função de filtro customizada; se omitida, filtra sobre todos os labelKeys */
  filterFn?: SelectFilterFn<T>;
  /** Mensagem exibida quando nenhuma opção é encontrada */
  emptyMessage?: string;
  /** Mensagem exibida no trigger quando nenhum item está selecionado */
  placeholder?: string;
  /** Desabilita o select */
  disabled?: boolean;
  /** Mensagem de erro a exibir abaixo do campo */
  error?: string;
  /**
   * Quando true, o fetch dos dados só ocorre na primeira abertura do dropdown.
   * Use em conjunto com initialLabel para exibir o rótulo do valor atual enquanto os dados não chegaram.
   */
  lazy?: boolean;
  /** Rótulo a exibir no trigger antes dos dados serem carregados (útil com lazy=true) */
  initialLabel?: string;
};

export type UseSelectRepositoryOptions<T> = {
  repository: Repository<T>;
  mapper: SelectOptionMapper<T>;
  filterFn?: SelectFilterFn<T>;
  lazy?: boolean;
};

export type SelectOption = {
  value: string;
  label: string;
  triggerLabel: string;
};
