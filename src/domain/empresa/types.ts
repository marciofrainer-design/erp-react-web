import type { Column, ModelBase } from "@/shared/types";
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
  { label: "ID", field: "idempresa", width: WIDTH_INTEGER_COLUMN },
  { label: "Fantasia", field: "nmfantasia", width: WIDTH_STRING_COLUMN },
  { label: "Razão Social", field: "nmrazaosocial", width: WIDTH_STRING_COLUMN },
  { label: "Abreviação", field: "dsabreviatura", width: WIDTH_SHORTSTRING_COLUMN },
  { label: "Tipo", field: "fltipo", width: WIDTH_INTEGER_COLUMN },
];

export { EmpresaColumns };
export type { Empresa };