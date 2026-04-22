import type { Hospede } from "./types";

export const blankHospede = <T extends Hospede>() =>
  ({
    id: 0,
    idempresa: 0,
    nome: "",
    documento: "",
    telefone: "",
    email: "",
  }) as unknown as T;
