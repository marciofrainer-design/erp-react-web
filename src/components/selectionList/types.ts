import type { EntityBase, Column } from "@/types";
import type { Repository } from "@/infra/interface/types";
import type { SelectOptionMapper } from "@/components/select/selectRepository.types";

export type SelectionListProps<T extends EntityBase> = {
  /** Repositório de onde os itens disponíveis serão buscados */
  repository: Repository<T>;
  /** Como mapear cada item para exibição no SelectRepository */
  mapper: SelectOptionMapper<T>;
  /** Colunas exibidas na tabela de itens selecionados */
  columns: Column<T>[];
  /** Campo de chave primária do tipo T (ex: "idcaracteristica") */
  primaryKeyField: keyof T;
  /** Lista atual de itens selecionados (controlado) */
  value: T[];
  /** Callback disparado quando a lista muda (adicionar ou remover) */
  onChange: (items: T[]) => void;
  /** Permite adicionar o mesmo item mais de uma vez (padrão: false) */
  allowDuplicates?: boolean;
  /** Rótulo exibido acima do SelectRepository */
  label?: string;
  /** Texto do botão de adicionar */
  addButtonLabel?: string;
  /** Texto do botão de remover */
  removeButtonLabel?: string;
  /** Mensagem exibida quando a lista está vazia */
  emptyMessage?: string;
};
