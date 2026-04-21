import { AndarRepository } from "./AndarRepository";
import type { Andar, AndarAll } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankAndar } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const AndarFactory = {
  createBlankAndar(): Andar {
    return blankAndar<Andar>();
  },
  dependencies(): CrudRegisterDependencies<Andar, AndarAll> {
    const repository = new AndarRepository(getAdapter());
    return { repository, primaryKeyName: "idandar" };
  }
};

export default AndarFactory;
