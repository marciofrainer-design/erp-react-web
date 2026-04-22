import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import { WIDTH_INTEGER_COLUMN, WIDTH_STRING_COLUMN } from "@/consts";

export type HospedeAll = EntityBase & {
  id: number;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
};

export type Hospede = EntityBase & {
  id: number;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
};

export const HOSPEDE_LABEL_KEYS = {
  id: "crud.fields.keyName",
  nome: "crud.fields.nome",
  documento: "crud.fields.documento",
  telefone: "crud.fields.telefone",
  email: "crud.fields.email",
} as const satisfies Record<keyof Omit<HospedeAll, "idempresa">, string>;

export type HospedeColumnDefinition = Omit<Column<HospedeAll>, "label"> & {
  labelKey: (typeof HOSPEDE_LABEL_KEYS)[keyof typeof HOSPEDE_LABEL_KEYS];
};

export const HospedeColumns: HospedeColumnDefinition[] = [
  {
    labelKey: HOSPEDE_LABEL_KEYS.id,
    field: "id",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.Integer,
    visible: true,
    sortable: true,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.nome,
    field: "nome",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: true,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.documento,
    field: "documento",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: true,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.telefone,
    field: "telefone",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: false,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.email,
    field: "email",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: false,
  },
];
