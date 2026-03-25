import type { Column } from "@/shared/types"

type TableProps<T extends object> = {
  columns: Column<T>[]
  data: T[]
}

export type { TableProps };