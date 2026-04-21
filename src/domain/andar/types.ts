import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/consts";
import type { Repository } from "@/infra/interface/types";

export type AndarAll = EntityBase & {
  idandar: number;
  idempresa: number;
  cdandar: string;
  nmandar: string;
  isativo: number;
  empresa_dsabreviatura: string;
};

export type Andar = EntityBase & {
  idandar: number;
  idempresa: number;
  cdandar: string;
  nmandar: string;
  isativo: number;
};

export type AndarUpdate = EntityBase & {
  idandar: number;
  idempresa: number;
  cdandar: string;
  nmandar: string;
  isativo: number;
};

export type AndarCreate = EntityBase & {
  idandar: number;
  idempresa: number;
  cdandar: string;
  nmandar: string;
  isativo: number;
};

export const ANDAR_LABEL_KEYS = {
  idandar: "crud.fields.keyName",
  nmandar: "crud.fields.nameLabel",
  isativo: "crud.fields.situation",
  empresa_dsabreviatura: "crud.fields.company",
  cdandar: "crud.fields.identificator",
} as const satisfies Record<keyof Omit<AndarAll, "idempresa" | "id">, string>;

export type AndarColumnDefinition = Omit<Column<AndarAll>, "label"> & {
  labelKey: (typeof ANDAR_LABEL_KEYS)[keyof typeof ANDAR_LABEL_KEYS];
};

export const AndarColumns: AndarColumnDefinition[] = [
  {
    labelKey: ANDAR_LABEL_KEYS.idandar,
    field: "idandar",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: ANDAR_LABEL_KEYS.nmandar,
    field: "nmandar",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: ANDAR_LABEL_KEYS.isativo,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: ANDAR_LABEL_KEYS.empresa_dsabreviatura,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: ANDAR_LABEL_KEYS.cdandar,
    field: "cdandar",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];

export type AndarDependencies = {
  andarRepository: Repository<AndarAll, Andar>;
};

