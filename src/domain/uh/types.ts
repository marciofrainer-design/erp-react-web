import type { Column } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
} from "@/consts";
import type { Repository } from "@/infra/interface/types";
import type { EntityBase } from "@/types";

export type Uh = EntityBase & {
  idempresa: number;
  iduh: number;
  cduh: string;
  dsuh: string;
  isativo: number;
  isacessibilidade: number;
  iduhtipo: number;
  nmuhtipo: string;
  idandar: number;
  nmandar: string;
  idedificacao: number;
  nmedificacao: string;
  empresa_dsabreviatura: string;
  qtquarto: number;
  iduhclassificacao: number;
};

export const UH_LABEL_KEYS = {
  identificator: "crud.fields.identificator",
  uhType: "crud.fields.uhType",
  situation: "crud.fields.situation",
  company: "crud.fields.company",
  floor: "crud.fields.floor",
  nmEdification: "crud.fields.nmEdification",  
} as const;

export type UhColumnDefinition = Omit<Column<Uh>, "label"> & {
  labelKey: (typeof UH_LABEL_KEYS)[keyof typeof UH_LABEL_KEYS];
};

export const UhColumns: UhColumnDefinition[] = [
  {
    labelKey: UH_LABEL_KEYS.identificator,
    field: "cduh",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UH_LABEL_KEYS.floor,
    field: "nmandar",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UH_LABEL_KEYS.uhType,
    field: "nmuhtipo",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UH_LABEL_KEYS.situation,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: UH_LABEL_KEYS.company,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UH_LABEL_KEYS.nmEdification,
    field: "nmedificacao",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  }
];

export type UhDependencies = {
  uhRepository: Repository<Uh>;
};
