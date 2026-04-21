import type { UHClassificacao } from "@/domain/uhclassificacao/types";

export const blankUHClassificacao = <T extends UHClassificacao>() =>
  ({
    iduhclassificacao: 0,
    idempresa: 0,
    dsidentificador: "",
    nmclassificacao: "",
    isativo: 1,
  }) as T;
