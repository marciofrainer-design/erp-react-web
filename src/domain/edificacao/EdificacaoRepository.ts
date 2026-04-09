import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Edificacao } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Edificacao";
export class EdificacaoRepository extends RepositoryBase<Edificacao> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
