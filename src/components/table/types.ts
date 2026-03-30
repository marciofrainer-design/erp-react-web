import type { Column } from "@/types"

type TableProps<T extends object> = {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T, index: number) => void
  onRowDblClick?: (row: T, index: number) => void
  indexSelected?: number | null
  totalPageCount?: number
  currentPage?: number
  onPageChange?: (page: number) => void
  rowsCount?: number
  totalRowsCount?: number
}

export type { TableProps };