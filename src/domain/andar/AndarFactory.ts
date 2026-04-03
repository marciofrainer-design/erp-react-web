import { DataSnapAdapter } from "@/infra/api/service";
import { AndarRepository } from "./AndarRepository";
import type { Andar } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankAndar } from "./consts";

export const AndarFactory = {
  createBlankAndar(): Andar {
    return blankAndar<Andar>();
  },
  dependencies(): CrudRegisterDependencies<Andar> {
    const adapter = new DataSnapAdapter();
    const repository = new AndarRepository(adapter);
    return { repository, primaryKeyName: "idandar" };
  }
};

export default AndarFactory;
