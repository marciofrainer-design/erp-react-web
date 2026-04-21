import type { Andar } from "@/domain/andar/types";

export const blankAndar = <T extends Andar>() =>
  ({
    id: 0,
    idandar: 0,
    idempresa: 0,
    cdandar: "",
    nmandar: "",
    isativo: 1,
  }) as unknown as T;