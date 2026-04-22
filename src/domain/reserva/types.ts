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

export type ReservaAll = EntityBase & {
  idreserva: number;
  idempresa: number;
  idhospede: number;
  iduh: number;
  dtentrada: string;
  dtsaida: string;
  nmobservacao: string;
  isativo: number;
  hospede_nmnome: string;
  uh_cduh: string;
  empresa_dsabreviatura: string;
};

export type Reserva = EntityBase & {
  idreserva: number;
  idempresa: number;
  idhospede: number;
  iduh: number;
  dtentrada: string;
  dtsaida: string;
  nmobservacao: string;
  isativo: number;
};

export type ReservaUpdate = EntityBase & {
  idreserva: number;
  idempresa: number;
  idhospede: number;
  iduh: number;
  dtentrada: string;
  dtsaida: string;
  nmobservacao: string;
  isativo: number;
};

export type ReservaCreate = EntityBase & {
  idempresa: number;
  idhospede: number;
  iduh: number;
  dtentrada: string;
  dtsaida: string;
  nmobservacao: string;
  isativo: number;
};

export const RESERVA_LABEL_KEYS = {
  idreserva: "crud.fields.keyName",
  hospede_nmnome: "crud.fields.guest",
  uh_cduh: "crud.fields.uh",
  dtentrada: "crud.fields.checkInDate",
  dtsaida: "crud.fields.checkOutDate",
  nmobservacao: "crud.fields.notes",
  isativo: "crud.fields.situation",
  empresa_dsabreviatura: "crud.fields.company",
} as const satisfies Record<
  keyof Omit<ReservaAll, "idempresa" | "idhospede" | "iduh" | "id">,
  string
>;

export type ReservaColumnDefinition = Omit<Column<ReservaAll>, "label"> & {
  labelKey: (typeof RESERVA_LABEL_KEYS)[keyof typeof RESERVA_LABEL_KEYS];
};

export const ReservaColumns: ReservaColumnDefinition[] = [
  {
    labelKey: RESERVA_LABEL_KEYS.idreserva,
    field: "idreserva",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.hospede_nmnome,
    field: "hospede_nmnome",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.uh_cduh,
    field: "uh_cduh",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.dtentrada,
    field: "dtentrada",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.DATE,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.dtsaida,
    field: "dtsaida",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.DATE,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.isativo,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.empresa_dsabreviatura,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];

export type ReservaDependencies = {
  reservaRepository: Repository<ReservaAll, Reserva>;
};
