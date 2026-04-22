import { HospedeRepository } from "./HospedeRepository";
import type { Hospede, HospedeAll } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankHospede } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const HospedeFactory = {
  createBlankHospede(): Hospede {
    return blankHospede<Hospede>();
  },
  dependencies(): CrudRegisterDependencies<Hospede, HospedeAll> {
    const repository = new HospedeRepository(getAdapter());
    return { repository, primaryKeyName: "idhospede" };
  },
};

export default HospedeFactory;
