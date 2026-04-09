import { UHClassificacaoRepository } from "./UHClassificacaoRepository";
import type { UHClassificacao } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankUHClassificacao } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const UHClassificacaoFactory = {
  createBlankUHClassificacao(): UHClassificacao {
    return blankUHClassificacao<UHClassificacao>();
  },
  dependencies(): CrudRegisterDependencies<UHClassificacao> {
    const repository = new UHClassificacaoRepository(getAdapter());
    return { repository, primaryKeyName: "iduhclassificacao" };
  },
};

export default UHClassificacaoFactory;
