import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Reserva, ReservaAll } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Reserva";

export class ReservaRepository extends RepositoryBase<ReservaAll, Reserva> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
