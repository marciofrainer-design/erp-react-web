import type { Column, ModelBase } from "@/shared/types";
import { FieldType } from "@/shared/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/shared/consts";
import type { Repository } from "@/infra/interface";

type Andar = ModelBase & {
  idandar: number;
  idempresa: number;
  nmempresa: string;
  cdandar: string;
  nmandar: string;
  isativo: number;
};

const AndarColumns: Column<Andar>[] = [
  {
    label: "Chave",
    field: "idandar",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    label: "Nome",
    field: "nmandar",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    label: "Sit.",
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    label: "Estab.",
    field: "nmempresa",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    label: "Identificador",
    field: "cdandar",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];

type AndarDependencies = {
  andarRepository: Repository<Andar>;
};


export { AndarColumns };
export type { Andar, AndarDependencies };
