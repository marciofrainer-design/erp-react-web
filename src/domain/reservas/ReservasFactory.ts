import { ReservasRepository } from "./ReservasRepository";
import type { Reserva, ReservaAll } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankReserva } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const ReservasFactory = {
  createBlankReserva(): Reserva {
    return blankReserva<Reserva>();
  },
  dependencies(): CrudRegisterDependencies<Reserva, ReservaAll> {
    const repository = new ReservasRepository(getAdapter());
    return { repository, primaryKeyName: "id" };
  },
};

export default ReservasFactory;
