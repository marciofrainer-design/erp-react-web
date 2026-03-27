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
  register?: React.ReactNode;
  dependencies?: CrudRegisterDependencies<T>;
};

export type CrudRepository<T> = {
  getAll: () => Promise<T[]>;
  save: (item: T) => Promise<void>;
  delete?: (id: number | string) => Promise<void>;
};

export type CrudRegisterDependencies<T> = {
  repository: CrudRepository<T>;
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
};
