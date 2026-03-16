import type { Column } from "@/comum/types"

type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
}

export type { TableProps };