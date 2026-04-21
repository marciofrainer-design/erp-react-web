import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/consts";

export type EdificacaoAll = EntityBase & {
  idedificacao: number;
  idempresa: number;
  cdedificacao: string;
  nmedificacao: string;
  isativo: number;
  empresa_dsabreviatura: string;
};

export type Edificacao = EntityBase & {
  idedificacao: number;
  idempresa: number;
  cdedificacao: string;
  nmedificacao: string;
  isativo: number;
};

export const EDIFICACAO_LABEL_KEYS: Record<keyof Omit<EdificacaoAll, "id">, string> = {
  idedificacao: "crud.fields.keyName",
  idempresa: "crud.fields.companyId",
  cdedificacao: "crud.fields.identificator",
  nmedificacao: "crud.fields.nameLabel",
  isativo: "crud.fields.situation",
  empresa_dsabreviatura: "crud.fields.company",
} as const;

export type EdificacaoColumnDefinition = Omit<Column<EdificacaoAll>, "label"> & {
  labelKey: (typeof EDIFICACAO_LABEL_KEYS)[keyof typeof EDIFICACAO_LABEL_KEYS];
};

export const EdificacaoColumns: EdificacaoColumnDefinition[] = [
  {
    labelKey: EDIFICACAO_LABEL_KEYS.idedificacao,
    field: "idedificacao",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: EDIFICACAO_LABEL_KEYS.cdedificacao,
    field: "cdedificacao",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: EDIFICACAO_LABEL_KEYS.nmedificacao,
    field: "nmedificacao",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: EDIFICACAO_LABEL_KEYS.isativo,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: EDIFICACAO_LABEL_KEYS.empresa_dsabreviatura,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];
