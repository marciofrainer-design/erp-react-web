import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/consts";

export type UHClassificacao = EntityBase & {
  iduhclassificacao: number;
  idempresa: number;
  dsidentificador: string;
  nmclassificacao: string;
  isativo: number;
};

export const UHCLASSIFICACAO_LABEL_KEYS = {
  keyName: "crud.fields.keyName",
  identificator: "crud.fields.identificator",
  nameLabel: "crud.fields.nameLabel",
  situation: "crud.fields.situation",
} as const;

export type UHClassificacaoColumnDefinition = Omit<Column<UHClassificacao>, "label"> & {
  labelKey: (typeof UHCLASSIFICACAO_LABEL_KEYS)[keyof typeof UHCLASSIFICACAO_LABEL_KEYS];
};

export const UHClassificacaoColumns: UHClassificacaoColumnDefinition[] = [
  {
    labelKey: UHCLASSIFICACAO_LABEL_KEYS.keyName,
    field: "iduhclassificacao",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: UHCLASSIFICACAO_LABEL_KEYS.identificator,
    field: "dsidentificador",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UHCLASSIFICACAO_LABEL_KEYS.nameLabel,
    field: "nmclassificacao",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UHCLASSIFICACAO_LABEL_KEYS.situation,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
];
