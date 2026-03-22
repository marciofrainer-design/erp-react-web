type Column<T> = {
  label: string
  field: keyof T
  width?: string
}

type ModelBase = {
  id: number
}

export type { Column, ModelBase }