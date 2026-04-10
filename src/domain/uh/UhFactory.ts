import { UhRepository } from "./UhRepository";
import type { Uh, UhRegisterDependencies } from "./types";
import { blankUh } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";
import { EdificacaoRepository } from "../edificacao";
import { UhTipoRepository } from "../uhTipo/UhTipoRepository";
import { CaracteristicaRepository } from "../caracteristica/CaracteristicaRepository";

export const UhFactory = {
  createBlankUh(): Uh {
    return blankUh();
  },
  dependencies(): UhRegisterDependencies<Uh> {
    const repository = new UhRepository(getAdapter());
    const edificacaoRepository = new EdificacaoRepository(getAdapter());
    const uhTipoRepository = new UhTipoRepository(getAdapter());
    const caracteristicaRepository = new CaracteristicaRepository(getAdapter());
    return { repository, primaryKeyName: "iduh", edificacaoRepository, uhTipoRepository, caracteristicaRepository };
  },
};

export default UhFactory;
