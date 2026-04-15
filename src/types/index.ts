import type { ReactNode } from "react";

const FieldType = {
  STRING : "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  DATE: "date"
} as const;

type FieldType = typeof FieldType[keyof typeof FieldType]

const RegisterType = {
  CREATE: "create",
  UPDATE: "update"
} as const;

type RegisterType = typeof RegisterType[keyof typeof RegisterType]

type ColumnCheckboxConfig<T> = {
  checkedValue: T[keyof T]
  uncheckedValue: T[keyof T]
  onChange?: (row: T, value: T[keyof T], rowIndex: number) => void
  isChecked?: (value: T[keyof T], row: T, rowIndex: number) => boolean
  ariaLabel?: string | ((row: T, rowIndex: number) => string)
  disabled?: boolean | ((row: T, rowIndex: number) => boolean)
}

type Column<T> = {
  label: string
  field: keyof T
  width?: string
  type?: FieldType
  useDetails?: boolean
  cellRenderer?: (row: T, rowIndex: number) => ReactNode
  checkbox?: ColumnCheckboxConfig<T>
}

type EntityBase = {
  id: number
};

export type { Column, EntityBase }
export type { ColumnCheckboxConfig }
export { FieldType, RegisterType }
