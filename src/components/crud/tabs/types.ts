import type React from "react";
import type { LucideIcon } from "lucide-react";
import type { Column } from "@/types";
import type { Repository } from "@/infra/interface/types";

export type CrudDetailTab = {
  /** Identificador único da tab */
  value: string;
  /** Rótulo exibido na tab */
  label: string;
  /** Ícone opcional da tab */
  icon?: LucideIcon;
  /** Conteúdo renderizado quando a tab está ativa */
  content: React.ReactNode;
};

export type CrudRegisterTabsProps = {
  title: string;
  description?: string;
  /** Conteúdo da tab "Principal" — os campos do formulário mestre */
  masterContent: React.ReactNode;
  /** Tabs adicionais de detalhe */
  details?: CrudDetailTab[];
  /**
   * Quando true, as tabs de detalhe ficam desabilitadas.
   * Use quando o registro mestre ainda não foi salvo (mode === "new").
   */
  detailsDisabled?: boolean;
};

export type CrudDetailMode = "table" | "new" | "edit";

export type UseCrudDetailOptions<T extends object> = {
  repository: Repository<T>;
  parentIdField: keyof T;
  parentId: number | string;
  primaryKeyName: keyof T;
  createBlankItem: (parentId: number | string) => T;
  validate?: (data: T) => boolean;
};

export type CrudDetailSectionProps<T extends object> = {
  repository: Repository<T>;
  columns: Column<T>[];
  parentIdField: keyof T;
  parentId: number | string;
  primaryKeyName: keyof T;
  createBlankItem: (parentId: number | string) => T;
  validate?: (data: T) => boolean;
  register: (props: CrudDetailRegisterRenderProps<T>) => React.ReactNode;
  emptyMessage?: string;
};

export type CrudDetailRegisterRenderProps<T extends object> = {
  mode: "new" | "edit";
  data: T;
  onChange: <K extends keyof T>(field: K, value: T[K]) => void;
};
