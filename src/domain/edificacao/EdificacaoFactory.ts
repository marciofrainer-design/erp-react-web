import { EdificacaoRepository } from "./EdificacaoRepository";
import type { Edificacao } from "./types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import { blankEdificacao } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";

export const EdificacaoFactory = {
  createBlankEdificacao(): Edificacao {
    return blankEdificacao<Edificacao>();
  },
  dependencies(): CrudRegisterDependencies<Edificacao> {
    const repository = new EdificacaoRepository(getAdapter());
    return { repository, primaryKeyName: "idedificacao" };
  },
};

export default EdificacaoFactory;
