import type { Repository } from "@/infra/interface/types";
import type { Empresa } from "@/domain/empresa/types";

type SelectEmpresaProps = {
  onSelect: (id: string) => void;
  repository?: Repository<Empresa>;
};

export type { SelectEmpresaProps };