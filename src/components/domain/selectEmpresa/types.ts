import type { Repository } from "@/infra/interface/types";
import type { Empresa } from "@/domain/empresa/types";

type SelectEmpresaProps = {
  onSelect: (id: string) => void;
  value?: string | null;
  disabled?: boolean;
  repository?: Repository<Empresa>;
};

export type { SelectEmpresaProps };