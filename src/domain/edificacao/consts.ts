import type { Edificacao } from "@/domain/edificacao/types";

export const blankEdificacao = <T extends Edificacao>() =>
  ({
    idedificacao: 0,
    idempresa: 0,
    empresa_dsabreviatura: "",
    cdedificacao: "",
    nmedificacao: "",
    isativo: 1,
  }) as T;
