import type { Column } from "@/comum/types"

type TableProps<T extends object> = {
  columns: Column<T>[]
  data: T[]
}

export type { TableProps };