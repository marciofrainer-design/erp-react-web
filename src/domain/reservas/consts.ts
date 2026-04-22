import type { Reserva } from "./types";

export const blankReserva = <T extends Reserva>() =>
  ({
    id: 0,
    idempresa: 0,
    hospedeId: 0,
    quartoId: 0,
    dataEntrada: "",
    dataSaida: "",
    status: "PENDENTE" as const,
  }) as unknown as T;
