import type { Andar } from "@/domain/andar/types";

export const blankAndar = <T extends Andar>() => ({
  idandar: 0,
  idempresa: 0,
  nmempresa: "",
  cdandar: "",
  nmandar: "",
  isativo: 1,
} as T);