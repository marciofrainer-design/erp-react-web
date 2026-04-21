import type { Column } from "@/types"
import type React from "react"

type LeadingColumn<T extends object> = {
  /** Conteúdo do cabeçalho da coluna extra (ex: checkbox de selecionar todos) */
  header: React.ReactNode
  /** Conteúdo de cada célula da coluna extra */
  cell: (row: T, index: number) => React.ReactNode
  /** Largura CSS da coluna (padrão: w-10) */
  width?: string
}

type lastColumn<T extends object> = {
  /** Conteúdo do rodapé da coluna extra */
  footer: React.ReactNode
  /** Conteúdo de cada célula da coluna extra */
  cell: (row: T, index: number) => React.ReactNode
  /** Largura CSS da coluna (padrão: w-10) */
  width?: string
}

type TableProps<T extends object> = {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T, index: number) => void
  onRowDblClick?: (row: T, index: number) => void
  onCellChange?: (row: T, rowIndex: number, field: keyof T, value: T[keyof T]) => void
  indexSelected?: number | null
  totalPageCount?: number
  currentPage?: number
  onPageChange?: (page: number) => void
  rowsCount?: number
  totalRowsCount?: number
  /** Coluna extra renderizada antes das colunas normais */
  leadingColumn?: LeadingColumn<T>
  /** Coluna extra renderizada após as colunas normais */
  lastColumn?: lastColumn<T>
  /** Sobrescreve a classe CSS da linha; recebe a linha e o índice */
  getRowClassName?: (row: T, index: number) => string
  isDetailsTable?: boolean
}

export type { TableProps, LeadingColumn };