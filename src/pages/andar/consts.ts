import type { Andar } from "@/domain/andar/types";

export const blankAndar = (): Omit<Andar, "id"> => ({
  idandar: 0,
  idempresa: 0,
  nmempresa: "",
  cdandar: "",
  nmandar: "",
  isativo: 1,
});