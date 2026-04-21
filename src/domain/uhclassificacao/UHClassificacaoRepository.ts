import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { UHClassificacao } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Uhclassificacao";
export class UHClassificacaoRepository extends RepositoryBase<UHClassificacao> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
