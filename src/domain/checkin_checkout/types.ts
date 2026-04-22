import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import { WIDTH_INTEGER_COLUMN, WIDTH_STRING_COLUMN, WIDTH_DATE_COLUMN } from "@/consts";

export type CheckinStatus = "PENDENTE" | "CHECKED_IN" | "CHECKED_OUT";

export type CheckinAll = EntityBase & {
  id: number;
  reservaId: number;
  nomeHospede: string;
  cdUh: string;
  dataCheckIn: string;
  dataCheckOut: string;
  status: CheckinStatus;
};

export type Checkin = EntityBase & {
  id: number;
  reservaId: number;
  dataCheckIn: string;
  dataCheckOut: string;
  status: CheckinStatus;
};

export const CHECKIN_LABEL_KEYS = {
  id: "crud.fields.keyName",
  reservaId: "crud.fields.reservaId",
  nomeHospede: "crud.fields.nomeHospede",
  cdUh: "crud.fields.cdUh",
  dataCheckIn: "crud.fields.dataCheckIn",
  dataCheckOut: "crud.fields.dataCheckOut",
  status: "crud.fields.status",
} as const satisfies Record<keyof Omit<CheckinAll, "idempresa">, string>;

export type CheckinColumnDefinition = Omit<Column<CheckinAll>, "label"> & {
  labelKey: (typeof CHECKIN_LABEL_KEYS)[keyof typeof CHECKIN_LABEL_KEYS];
};

export const CheckinColumns: CheckinColumnDefinition[] = [
  {
    labelKey: CHECKIN_LABEL_KEYS.id,
    field: "id",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.Integer,
    visible: true,
    sortable: true,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.reservaId,
    field: "reservaId",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.Integer,
    visible: true,
    sortable: true,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.nomeHospede,
    field: "nomeHospede",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: true,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.cdUh,
    field: "cdUh",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: true,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.dataCheckIn,
    field: "dataCheckIn",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: true,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.dataCheckOut,
    field: "dataCheckOut",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: false,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.status,
    field: "status",
    width: WIDTH_STRING_COLUMN,
    type: FieldType.String,
    visible: true,
    sortable: true,
  },
];
