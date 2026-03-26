import type { Column } from "@/shared/types"

type TableProps<T extends object> = {
  columns: Column<T>[]
  data: T[]
  selectedIndex?: number | null
  onRowClick?: (row: T, index: number) => void
}

export type { TableProps };