import { HospedesRepository } from "./HospedesRepository";
import type { Hospede, HospedeAll } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankHospede } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const HospedesFactory = {
  createBlankHospede(): Hospede {
    return blankHospede<Hospede>();
  },
  dependencies(): CrudRegisterDependencies<Hospede, HospedeAll> {
    const repository = new HospedesRepository(getAdapter());
    return { repository, primaryKeyName: "id" };
  },
};

export default HospedesFactory;
