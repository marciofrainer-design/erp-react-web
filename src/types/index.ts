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

type Column<T> = {
  label: string
  field: keyof T
  width?: string
  type?: FieldType
  useDetails?: boolean
}

type EntityBase = {
  id: number
}

export type { Column, EntityBase }
export { FieldType, RegisterType }
