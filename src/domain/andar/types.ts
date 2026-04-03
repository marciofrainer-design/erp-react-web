import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/consts";
import type { Repository } from "@/infra/interface/types";

export type Andar = EntityBase & {
  idandar: number;
  idempresa: number;
  nmempresa: string;
  cdandar: string;
  nmandar: string;
  isativo: number;
};

export const ANDAR_LABEL_KEYS = {
  keyName: "crud.fields.keyName",
  nameLabel: "crud.fields.nameLabel",
  situation: "crud.fields.situation",
  company: "crud.fields.company",
  identificator: "crud.fields.identificator",
} as const;

export type AndarColumnDefinition = Omit<Column<Andar>, "label"> & {
  labelKey: (typeof ANDAR_LABEL_KEYS)[keyof typeof ANDAR_LABEL_KEYS];
};

export const AndarColumns: AndarColumnDefinition[] = [
  {
    labelKey: ANDAR_LABEL_KEYS.keyName,
    field: "idandar",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: ANDAR_LABEL_KEYS.nameLabel,
    field: "nmandar",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: ANDAR_LABEL_KEYS.situation,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: ANDAR_LABEL_KEYS.company,
    field: "nmempresa",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: ANDAR_LABEL_KEYS.identificator,
    field: "cdandar",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];

export type AndarDependencies = {
  andarRepository: Repository<Andar>;
};

