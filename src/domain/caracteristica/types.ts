import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/consts";
import type { UhCaracteristica } from "../uhcaracteristica";

export type CaracteristicaAll = EntityBase & {
  idcaracteristica: number;
  dscaracteristica: string;
  dsabreviatura: string;
  fltipo: number;
  idcaracteristica_emp: number;
  idempresa: number;
  flsituacao: number;
  empresa_dsabreviatura: string;
};  

export type Caracteristica = EntityBase & UhCaracteristica & {
  idcaracteristica: number;
  dscaracteristica: string;
  dsabreviatura: string;
  fltipo: number;
  idcaracteristica_emp: number;
  idempresa: number;
  flsituacao: number;
  empresa_dsabreviatura: string;
  isprincipal: number;
  iduh?: number;
};

export const CARACTERISTICA_LABEL_KEYS: Record<
  keyof Omit<
    CaracteristicaAll,
    "id" | "idempresa" | "flsituacao" | "empresa_dsabreviatura"
  >,
  string
> = {
  idcaracteristica: "crud.fields.keyName",
  dscaracteristica: "crud.fields.nameLabel",
  dsabreviatura: "crud.fields.abbreviation",
  fltipo: "crud.fields.type",
  isprincipal: "crud.fields.isPrincipal",
  idcaracteristica_emp: "crud.fields.characteristicCompanyId",
  iduh: "crud.fields.uhId",
} as const;

export type CaracteristicaColumnDefinition = Omit<
  Column<Caracteristica>,
  "label"
> & {
  labelKey: (typeof CARACTERISTICA_LABEL_KEYS)[keyof typeof CARACTERISTICA_LABEL_KEYS];
};

export const CaracteristicaColumns: CaracteristicaColumnDefinition[] = [
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.idcaracteristica,
    field: "idcaracteristica",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
    useDetails: false,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.dscaracteristica,
    field: "dscaracteristica",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
    useDetails: true,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.dsabreviatura,
    field: "dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
    useDetails: false,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.fltipo,
    field: "fltipo",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
    useDetails: false,
  },
  {
    labelKey: CARACTERISTICA_LABEL_KEYS.isprincipal,
    field: "isprincipal",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
    useDetails: true,
    checkbox: {
      checkedValue: 1,
      uncheckedValue: 0,
      isChecked: (value) => value === 1,
      ariaLabel: "Alternar caracteristica principal",
    },
  },
];
