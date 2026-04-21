import type { Caracteristica } from "@/domain/caracteristica/types";

export const blankCaracteristica = <T extends Caracteristica>() =>
  ({
    idcaracteristica: 0,
    idempresa: 0,
    dscaracteristica: "",
    dsabreviatura: "",
    fltipo: 1,
    idcaracteristica_emp: 0,
    flsituacao: 1,
    empresa_dsabreviatura: "",
  }) as unknown as T;
