import type { Repository } from "@/infra/interface/types";
import type { Column } from "@/shared/types";

export type CrudPageTemplateProps = {
  title: string;
  pageDescription?: string;
  search?: React.ReactNode;
  table?: React.ReactNode;
  register?: React.ReactNode;
  footer?: React.ReactNode;
  showTable?: boolean;
};

export type CrudPageProps<T extends object> = {
  title: string;
  pageDescription?: string;
  tableColumns: Column<T>[];
  tableData: T[];
  register?: (props: CrudRegisterRenderProps<T>) => React.ReactNode;
  createNewItem?: () => T;
  onSaved?: () => Promise<void> | void;
  dependencies?: CrudRegisterDependencies<T>;
  validate?: (data: T) => boolean;
};

export type CrudRegisterRenderProps<T extends object> = {
  mode: "view" | "new" | "clone";
  data: T;
  onChange: <K extends keyof T>(field: K, value: T[K]) => void;
};

// export type CrudRepository<T> = {
//   getAll: () => Promise<T[]>;
//   save: (item: T) => Promise<void>;
//   update: (item: T) => Promise<void>;
//   delete?: (id: number) => Promise<void>;
// };

export type CrudRegisterDependencies<T> = {
  repository: Repository<T>;
  primaryKeyName?: string;
};

export type CrudRegisterProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
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