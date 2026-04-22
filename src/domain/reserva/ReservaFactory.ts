import { ReservaRepository } from "./ReservaRepository";
import type { Reserva, ReservaAll } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankReserva } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const ReservaFactory = {
  createBlankReserva(): Reserva {
    return blankReserva<Reserva>();
  },
  dependencies(): CrudRegisterDependencies<Reserva, ReservaAll> {
    const repository = new ReservaRepository(getAdapter());
    return { repository, primaryKeyName: "idreserva" };
  },
};

export default ReservaFactory;
