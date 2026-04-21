import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { UHTipo } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "UhTipo";
export class UhTipoRepository extends RepositoryBase<UHTipo> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
