import { CheckinRepository } from "./CheckinRepository";
import type { Checkin, CheckinAll } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankCheckin } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const CheckinFactory = {
  createBlankCheckin(): Checkin {
    return blankCheckin<Checkin>();
  },
  dependencies(): CrudRegisterDependencies<Checkin, CheckinAll> {
    const repository = new CheckinRepository(getAdapter());
    return { repository, primaryKeyName: "id" };
  },
};

export default CheckinFactory;
