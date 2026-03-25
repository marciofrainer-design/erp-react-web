import type { Column, ModelBase } from "@/shared/types";
import { FieldType } from "@/shared/types";
import { WIDTH_INTEGER_COLUMN, WIDTH_SHORTSTRING_COLUMN, WIDTH_STRING_COLUMN } from "@/shared/consts";

type Empresa = ModelBase & {
  idempresa: number;
  fltipo: number;
  idempresamatriz?: number;
  nmfantasia: string;
  nmrazaosocial: string;
  dsabreviatura: string;
};

const EmpresaColumns: Column<Empresa>[] = [
  { label: "ID", field: "idempresa", width: WIDTH_INTEGER_COLUMN, type: FieldType.NUMBER },
  { label: "Fantasia", field: "nmfantasia", width: WIDTH_STRING_COLUMN, type: FieldType.STRING },
  { label: "Razão Social", field: "nmrazaosocial", width: WIDTH_STRING_COLUMN, type: FieldType.STRING },
  { label: "Abreviação", field: "dsabreviatura", width: WIDTH_SHORTSTRING_COLUMN, type: FieldType.STRING },
  { label: "Tipo", field: "fltipo", width: WIDTH_INTEGER_COLUMN, type: FieldType.NUMBER },
];

export { EmpresaColumns };
export type { Empresa };