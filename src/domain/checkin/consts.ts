import type { Checkin } from "@/domain/checkin/types";

export const blankCheckin = <T extends Checkin>() =>
  ({
    id: 0,
    idcheckin: 0,
    idreserva: 0,
    idempresa: 0,
    dtcheckin: "",
    dtcheckout: null,
    isativo: 1,
  }) as unknown as T;
