import type { Column } from "@/comum/types"

type CrudPageTemplateProps = {
  title: string
  company?: React.ReactNode
  search?: React.ReactNode
  table: React.ReactNode
  footer?: React.ReactNode
  actions?: React.ReactNode
}

type CrudPageProps<T extends object> = {
    title: string
    tableColumns: Column<T>[]
    tableData: T[]
}

export type { CrudPageTemplateProps, CrudPageProps };