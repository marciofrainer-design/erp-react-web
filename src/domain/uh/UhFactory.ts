import { UhRepository } from "./UhRepository";
import type { Uh } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankUh } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const UhFactory = {
  createBlankUh(): Uh {
    return blankUh<Uh>();
  },
  dependencies(): CrudRegisterDependencies<Uh> {
    const repository = new UhRepository(getAdapter());
    return { repository, primaryKeyName: "iduh" };
  },
};

export default UhFactory;
