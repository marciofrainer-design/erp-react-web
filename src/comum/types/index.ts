type Column<T> = {
  label: string
  field: keyof T
}

export type { Column }