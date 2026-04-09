import type { Edificacao } from "@/domain/edificacao/types";
import type { UHTipo } from "@/domain/uhTipo/types";
import type { Repository } from "@/infra/interface/types";
import type { Uh } from "@/domain/uh/types";
import type { CaracteristicaRepository } from "@/domain/caracteristica/CaracteristicaRepository";

export type UhRegisterProps = {
  data: Uh;
  mode?: "view" | "new" | "clone";
  onChange: <K extends keyof Uh>(field: K, value: Uh[K]) => void;
  repositories: { uhTipoRepository: Repository<UHTipo>, edificacaoRepository: Repository<Edificacao> };
};

export type UhTabsProps = {
  mode: "view" | "new" | "clone";
  data: Uh;
  onChange: <K extends keyof Uh>(field: K, value: Uh[K]) => void;
  repositories: {
    uhTipoRepository: Repository<UHTipo>;
    edificacaoRepository: Repository<Edificacao>;
    caracteristicaRepository: CaracteristicaRepository;
  };
};