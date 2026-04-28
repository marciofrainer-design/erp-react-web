import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import { WIDTH_INTEGER_COLUMN, WIDTH_STRING_COLUMN, WIDTH_DATE_COLUMN } from "@/consts";

export type ReservaStatus = "PENDENTE" | "CONFIRMADA" | "CANCELADA";

export type ReservaAll = EntityBase & {
  id: number;
  hospedeId: number;
  nomeHospede: string;
  quartoId: number;
  cdUh: string;
  dataEntrada: string;
  dataSaida: string;
  status: ReservaStatus;
};

export type Reserva = EntityBase & {
  id: number;
  hospedeId: number;
  quartoId: number;
  dataEntrada: string;
  dataSaida: string;
  status: ReservaStatus;
};

export const RESERVA_LABEL_KEYS = {
  id: "crud.fields.keyName",
  hospedeId: "crud.fields.hospedeId",
  nomeHospede: "crud.fields.nomeHospede",
  quartoId: "crud.fields.quartoId",
  cdUh: "crud.fields.cdUh",
  dataEntrada: "crud.fields.dataEntrada",
  dataSaida: "crud.fields.dataSaida",
  status: "crud.fields.status",
} as const satisfies Record<keyof Omit<ReservaAll, "idempresa">, string>;

export type ReservaColumnDefinition = Omit<Column<ReservaAll>, "label"> & {
  labelKey: (typeof RESERVA_LABEL_KEYS)[keyof typeof RESERVA_LABEL_KEYS];
};

export const ReservaColumns: ReservaColumnDefinition[] = [
  {
    labelKey: RESERVA_LABEL_KEYS.id,
    field: "id",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
    visible: true,
    sortable: true,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.nomeHospede,
    field: "nomeHospede",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
    visible: true,
    sortable: true,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.cdUh,
    field: "cdUh",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
    visible: true,
    sortable: true,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.dataEntrada,
    field: "dataEntrada",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.STRING,
    visible: true,
    sortable: true,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.dataSaida,
    field: "dataSaida",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.STRING,
    visible: true,
    sortable: true,
  },
  {
    labelKey: RESERVA_LABEL_KEYS.status,
    field: "status",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.STRING,
    visible: true,
    sortable: true,
  },
];
