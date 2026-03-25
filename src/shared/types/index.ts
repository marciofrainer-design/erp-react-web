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
}

type ModelBase = {
  id: number
}

export type { Column, ModelBase }
export { FieldType, RegisterType }
