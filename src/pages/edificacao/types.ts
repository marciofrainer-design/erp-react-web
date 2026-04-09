import type { Edificacao } from "@/domain/edificacao/types";

export type EdificacaoRegisterProps = {
  data: Edificacao;
  mode?: "view" | "new" | "clone";
  onChange: <K extends keyof Edificacao>(field: K, value: Edificacao[K]) => void;
};
