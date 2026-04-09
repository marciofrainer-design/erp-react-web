import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/consts";

export type Caracteristica = EntityBase & {
  idcaracteristica: number;
  idempresa: number;
  dscaracteristica: string;
  dsabreviatura: string;
  fltipo: number;
  idcaracteristica_emp: number;
  flsituacao: number;
  empresa_dsabreviatura: string;
};

export const CARACTERISTICA_LABEL_KEYS = {
  keyName: "crud.fields.keyName",
  name: "crud.fields.nameLabel",
  abbreviation: "crud.fields.abbreviation",
  type: "crud.fields.type",
  situation: "crud.fields.situation",
  company: "crud.fields.company",
} as const;

export type CaracteristicaColumnDefinition = Omit<Column<Caracteristica>, "label"> & {
  labelKey: (typeof CARACTERISTICA_LABEL_KEYS)[keyof typeof CARACTERISTICA_LABEL_KEYS];
};

export const CaracteristicaColumns: CaracteristicaColumnDefinition[] = [
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.keyName,
    field: "idcaracteristica",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.name,
    field: "dscaracteristica",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.abbreviation,
    field: "dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.type,
    field: "fltipo",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.situation,
    field: "flsituacao",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.company,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];
