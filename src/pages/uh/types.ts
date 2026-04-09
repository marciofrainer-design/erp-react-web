import type { Uh } from "@/domain/uh/types";
import type { UHTipo } from "@/domain/uhTipo/types";
import type { Repository } from "@/infra/interface/types";

export type UhRegisterProps = {
  data: Uh;
  mode?: "view" | "new" | "clone";
  onChange: <K extends keyof Uh>(field: K, value: Uh[K]) => void;
  uhTipoRepository: Repository<UHTipo>;
};
