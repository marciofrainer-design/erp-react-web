import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_STRING_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
  WIDTH_DATE_COLUMN,
} from "@/consts";
import type { Repository } from "@/infra/interface/types";

export type HospedeAll = EntityBase & {
  idhospede: number;
  idempresa: number;
  nmnome: string;
  cpcpf: string;
  dtnascimento: string;
  nmtelefone: string;
  nmemail: string;
  isativo: number;
  empresa_dsabreviatura: string;
};

export type Hospede = EntityBase & {
  idhospede: number;
  idempresa: number;
  nmnome: string;
  cpcpf: string;
  dtnascimento: string;
  nmtelefone: string;
  nmemail: string;
  isativo: number;
};

export type HospedeUpdate = EntityBase & {
  idhospede: number;
  idempresa: number;
  nmnome: string;
  cpcpf: string;
  dtnascimento: string;
  nmtelefone: string;
  nmemail: string;
  isativo: number;
};

export type HospedeCreate = EntityBase & {
  idempresa: number;
  nmnome: string;
  cpcpf: string;
  dtnascimento: string;
  nmtelefone: string;
  nmemail: string;
  isativo: number;
};

export const HOSPEDE_LABEL_KEYS = {
  idhospede: "crud.fields.keyName",
  nmnome: "crud.fields.nameLabel",
  cpcpf: "crud.fields.cpf",
  dtnascimento: "crud.fields.birthdate",
  nmtelefone: "crud.fields.phone",
  nmemail: "crud.fields.email",
  isativo: "crud.fields.situation",
  empresa_dsabreviatura: "crud.fields.company",
} as const satisfies Record<keyof Omit<HospedeAll, "idempresa" | "id">, string>;

export type HospedeColumnDefinition = Omit<Column<HospedeAll>, "label"> & {
  labelKey: (typeof HOSPEDE_LABEL_KEYS)[keyof typeof HOSPEDE_LABEL_KEYS];
};

export const HospedeColumns: HospedeColumnDefinition[] = [
  {
    labelKey: HOSPEDE_LABEL_KEYS.idhospede,
    field: "idhospede",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.nmnome,
    field: "nmnome",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.cpcpf,
    field: "cpcpf",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.dtnascimento,
    field: "dtnascimento",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.DATE,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.nmtelefone,
    field: "nmtelefone",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.isativo,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: HOSPEDE_LABEL_KEYS.empresa_dsabreviatura,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];

export type HospedeDependencies = {
  hospedeRepository: Repository<HospedeAll, Hospede>;
};
