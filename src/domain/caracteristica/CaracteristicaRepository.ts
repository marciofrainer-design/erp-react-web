import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Caracteristica } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Caracteristica";
export class CaracteristicaRepository extends RepositoryBase<Caracteristica> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
