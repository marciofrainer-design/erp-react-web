import type { Column, EntityBase } from "@/types";
import { FieldType } from "@/types";
import {
  WIDTH_INTEGER_COLUMN,
  WIDTH_BOOLEAN_COLUMN,
  WIDTH_SHORTSTRING_COLUMN,
  WIDTH_DATE_COLUMN,
} from "@/consts";
import type { Repository } from "@/infra/interface/types";

export type CheckinAll = EntityBase & {
  idcheckin: number;
  idreserva: number;
  idempresa: number;
  dtcheckin: string;
  dtcheckout: string | null;
  isativo: number;
  hospede_nmnome: string;
  uh_cduh: string;
  empresa_dsabreviatura: string;
};

export type Checkin = EntityBase & {
  idcheckin: number;
  idreserva: number;
  idempresa: number;
  dtcheckin: string;
  dtcheckout: string | null;
  isativo: number;
};

export type CheckinUpdate = EntityBase & {
  idcheckin: number;
  idreserva: number;
  idempresa: number;
  dtcheckin: string;
  dtcheckout: string | null;
  isativo: number;
};

export type CheckinCreate = EntityBase & {
  idreserva: number;
  idempresa: number;
  dtcheckin: string;
  dtcheckout: string | null;
  isativo: number;
};

export const CHECKIN_LABEL_KEYS = {
  idcheckin: "crud.fields.keyName",
  hospede_nmnome: "crud.fields.guest",
  uh_cduh: "crud.fields.uh",
  dtcheckin: "crud.fields.checkInDate",
  dtcheckout: "crud.fields.checkOutDate",
  isativo: "crud.fields.situation",
  empresa_dsabreviatura: "crud.fields.company",
} as const satisfies Record<
  keyof Omit<CheckinAll, "idreserva" | "idempresa" | "id">,
  string
>;

export type CheckinColumnDefinition = Omit<Column<CheckinAll>, "label"> & {
  labelKey: (typeof CHECKIN_LABEL_KEYS)[keyof typeof CHECKIN_LABEL_KEYS];
};

export const CheckinColumns: CheckinColumnDefinition[] = [
  {
    labelKey: CHECKIN_LABEL_KEYS.idcheckin,
    field: "idcheckin",
    width: WIDTH_INTEGER_COLUMN,
    type: FieldType.NUMBER,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.hospede_nmnome,
    field: "hospede_nmnome",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.uh_cduh,
    field: "uh_cduh",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.dtcheckin,
    field: "dtcheckin",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.DATE,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.dtcheckout,
    field: "dtcheckout",
    width: WIDTH_DATE_COLUMN,
    type: FieldType.DATE,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.isativo,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: CHECKIN_LABEL_KEYS.empresa_dsabreviatura,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];

export type CheckinDependencies = {
  checkinRepository: Repository<CheckinAll, Checkin>;
};
