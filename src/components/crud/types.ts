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

export type { CrudPageTemplateProps, CrudPageProps };