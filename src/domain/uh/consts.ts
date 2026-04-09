import type { Uh } from "./types";

export const blankUh = <T extends Uh>() =>
  ({
    iduh: 0,
    idempresa: 0,
    cduh: "",
    dsuh: "",
    isativo: 1,
    isacessibilidade: 0,
    iduhtipo: 0,
    nmuhtipo: "",
    nmandar: "",
    nmedificacao: "",
    empresa_dsabreviatura: "",
    caracteristicas: [],
  } as T);
