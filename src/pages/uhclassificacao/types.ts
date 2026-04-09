import type { UHClassificacao } from "@/domain/uhclassificacao/types";

export type UHClassificacaoRegisterProps = {
  data: UHClassificacao;
  mode?: "view" | "new" | "clone";
  onChange: <K extends keyof UHClassificacao>(field: K, value: UHClassificacao[K]) => void;
};
