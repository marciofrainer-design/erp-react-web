import type { Column } from "@/shared/types"

type CrudPageTemplateProps = {
  title: string
  company?: React.ReactNode
  search?: React.ReactNode
  table?: React.ReactNode
  register?: React.ReactNode
  footer?: React.ReactNode
  actions?: React.ReactNode
  showTable?: boolean
}

type CrudPageProps<T extends object> = {
  title: string
  tableColumns: Column<T>[]
  tableData: T[]
  register?: React.ReactNode
}

export type CrudRepository<T> = {
  getAll: () => Promise<T[]>
  save: (item: T) => Promise<void>
  delete?: (id: number | string) => Promise<void>
}

export type CrudRegisterDependencies<T> = {
  repository: CrudRepository<T>
}

type CrudRegisterProps<T extends object> = {
  children: React.ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onCancel?: () => void
  dependencies?: CrudRegisterDependencies<T>
}

export type { CrudPageTemplateProps, CrudPageProps, CrudRegisterProps };
