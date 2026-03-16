type Column<T> = {
  label: string
  field: keyof T
  width?: string
}

type PersistentEntity = {
  id: number
}

export type { Column, PersistentEntity }