import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Uh } from "./uh.types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Uh";
export class UhRepository extends RepositoryBase<Uh> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
