import type { Hospede } from "@/domain/hospede/types";

export const blankHospede = <T extends Hospede>() =>
  ({
    id: 0,
    idhospede: 0,
    idempresa: 0,
    nmnome: "",
    cpcpf: "",
    dtnascimento: "",
    nmtelefone: "",
    nmemail: "",
    isativo: 1,
  }) as unknown as T;
