import type { Repository } from "@/infra/interface/types";
import type { Column } from "@/types";

export type CrudPageTemplateProps = {
  title: string;
  pageDescription?: string;
  search?: React.ReactNode;
  table?: React.ReactNode;
  register?: React.ReactNode;
  footer?: React.ReactNode;
  showTable?: boolean;
};

export type CrudPageProps<T extends object, TList extends object = T> = {
  title: string;
  pageDescription?: string;
  tableColumns: Column<TList>[];
  onModeChange?: (mode: CrudMode) => void;
  /** Formulário simples (CrudRegister). Ignorado se `tabs` for fornecido. */
  register?: (props: CrudRegisterRenderProps<T>) => React.ReactNode;
  /** Formulário em abas (CrudRegisterTabs). Tem prioridade sobre `register`. */
  tabs?: (props: CrudRegisterRenderProps<T>) => React.ReactNode;
  createNewItem?: () => T;
  onSaved?: () => Promise<void> | void;
  dependencies: CrudRegisterDependencies<T, TList>;
  validate?: (data: T) => boolean;
};

export type UseCrudOptions<T extends object, TList extends object = T> = Pick<
  CrudPageProps<T, TList>,
  "createNewItem" | "dependencies" | "validate"
>;

export type CrudRegisterRenderProps<T extends object> = {
  mode: "view" | "new" | "clone";
  data: T;
  onChange: <K extends keyof T>(field: K, value: T[K]) => void;
};

export type CrudRegisterDependencies<T extends object, TList extends object = T> = {
  repository: Repository<TList, T>;
  primaryKeyName: keyof T & keyof TList;
};

export type CrudRegisterProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showTitle?: boolean;
  helpPanel?: React.ReactNode;
};

export type ViewMode = "list" | "edit";

export type CrudToolbarProps = {
  onView: () => void;
  onNew: () => void;
  onClone: () => void;
  onDelete: () => void;
  onPrint: () => void;
  onClose: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  hasSelected: boolean;
  showTable?: boolean;
  isFormValid?: boolean;
};

export type CrudMode = "table" | "view" | "new" | "clone";

export type CrudSearchProps = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
};