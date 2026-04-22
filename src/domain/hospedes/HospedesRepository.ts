import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Hospede, HospedeAll } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Hospedes";
export class HospedesRepository extends RepositoryBase<HospedeAll, Hospede> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
