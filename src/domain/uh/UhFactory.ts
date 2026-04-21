import { UhRepository } from "./UhRepository";
import type { Uh, UhAll, UhRegisterDependencies } from "./types";
import { blankUh } from "./consts";
import { getAdapter } from "@/infra/factories/adapterFactory";
import { EdificacaoRepository } from "../edificacao";
import { UhTipoRepository } from "../uhTipo/UhTipoRepository";
import { CaracteristicaRepository } from "../caracteristica/CaracteristicaRepository";
import { AndarRepository } from "../andar/AndarRepository";

export const UhFactory = {
  createBlankUh(): Uh {
    return blankUh();
  },
  dependencies(): UhRegisterDependencies<Uh, UhAll> {
    const repository = new UhRepository(getAdapter());
    const edificacaoRepository = new EdificacaoRepository(getAdapter());
    const uhTipoRepository = new UhTipoRepository(getAdapter());
    const caracteristicaRepository = new CaracteristicaRepository(getAdapter());
    const andarRepository = new AndarRepository(getAdapter());
    return {
      repository,
      primaryKeyName: "iduh",
      edificacaoRepository,
      uhTipoRepository,
      caracteristicaRepository,
      andarRepository,
    };
  },
};

export default UhFactory;
