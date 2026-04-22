import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Checkin, CheckinAll } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Checkin";

export class CheckinRepository extends RepositoryBase<CheckinAll, Checkin> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
