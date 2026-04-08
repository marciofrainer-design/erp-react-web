import type { Uh } from "./uh.types";

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
    iduhtipo_emp: 0,
    empresa_dsabreviatura: "",
  } as T);
