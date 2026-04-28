import type { Checkin } from "./types";

export const blankCheckin = <T extends Checkin>() =>
  ({
    id: 0,
    idempresa: 0,
    reservaId: 0,
    dataCheckIn: "",
    dataCheckOut: "",
    status: "PENDENTE" as const,
  }) as unknown as T;
