import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Hospede, HospedeAll } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Hospede";

export class HospedeRepository extends RepositoryBase<HospedeAll, Hospede> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
