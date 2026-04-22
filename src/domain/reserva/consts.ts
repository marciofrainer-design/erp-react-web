import type { Reserva } from "@/domain/reserva/types";

export const blankReserva = <T extends Reserva>() =>
  ({
    id: 0,
    idreserva: 0,
    idempresa: 0,
    idhospede: 0,
    iduh: 0,
    dtentrada: "",
    dtsaida: "",
    nmobservacao: "",
    isativo: 1,
  }) as unknown as T;
