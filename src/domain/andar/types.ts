import type { Column, ModelBase } from "@/shared/types";
import { WIDTH_INTEGER_COLUMN, 
         WIDTH_STRING_COLUMN, 
         WIDTH_BOOLEAN_COLUMN, 
         WIDTH_SHORTSTRING_COLUMN } from "@/shared/consts";

type AndarModel = ModelBase & {
    idandar: number;
    idempresa: number;
    nmempresa: string;
    cdandar: string;
    nmandar: string;
    isativo: number;
}

const AndarColumns: Column<AndarModel>[] = [
    { label: "Chave", field: "idandar", width: WIDTH_INTEGER_COLUMN},
    { label: "Nome", field: "nmandar", width: WIDTH_STRING_COLUMN },
    { label: "Sit.", field: "isativo", width: WIDTH_BOOLEAN_COLUMN },
    { label: "Estab.", field: "nmempresa", width: WIDTH_SHORTSTRING_COLUMN },
    { label: "Identificador", field: "cdandar", width: WIDTH_SHORTSTRING_COLUMN }
];

export { AndarColumns };
export type { AndarModel };
