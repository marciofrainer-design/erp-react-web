import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/consts";

export type Edificacao = EntityBase & {
  idedificacao: number;
  idempresa: number;
  empresa_dsabreviatura: string;
  cdedificacao: string;
  nmedificacao: string;
  isativo: number;
};

export const EDIFICACAO_LABEL_KEYS = {
  keyName: "crud.fields.keyName",
  identificator: "crud.fields.identificator",
  nameLabel: "crud.fields.nameLabel",
  situation: "crud.fields.situation",
  company: "crud.fields.company",
} as const;

export type EdificacaoColumnDefinition = Omit<Column<Edificacao>, "label"> & {
  labelKey: (typeof EDIFICACAO_LABEL_KEYS)[keyof typeof EDIFICACAO_LABEL_KEYS];
};

export const EdificacaoColumns: EdificacaoColumnDefinition[] = [
  {
    labelKey: EDIFICACAO_LABEL_KEYS.keyName,
    field: "idedificacao",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: EDIFICACAO_LABEL_KEYS.identificator,
    field: "cdedificacao",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: EDIFICACAO_LABEL_KEYS.nameLabel,
    field: "nmedificacao",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: EDIFICACAO_LABEL_KEYS.situation,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: EDIFICACAO_LABEL_KEYS.company,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];
