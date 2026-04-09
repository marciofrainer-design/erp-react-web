import { CaracteristicaRepository } from "./CaracteristicaRepository";
import type { Caracteristica } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankCaracteristica } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const CaracteristicaFactory = {
  createBlankCaracteristica(): Caracteristica {
    return blankCaracteristica<Caracteristica>();
  },
  dependencies(): CrudRegisterDependencies<Caracteristica> {
    const repository = new CaracteristicaRepository(getAdapter());
    return { repository, primaryKeyName: "idcaracteristica" };
  },
};

export default CaracteristicaFactory;
