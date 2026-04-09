import { faker } from "@faker-js/faker/locale/pt_BR";
import type { UHTipo } from "@/domain/uhTipo/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

faker.seed(77);

const GRUPOS = ["Apartamentos", "Suítes", "Chalés", "Cabanas"];

let store: UHTipo[] = [
  { iduhtipo: 1, cduhtipo: "STD", nmuhtipo: "Standard", dsuhtipo: "Quarto padrão", iduhtipogrupo: 1, qtleito: 2, dhinclusao: "", dhalteracao: "", fltipocobranca: 1, iduhtipogrupo_1: 1, nmtipogrupo: GRUPOS[0], flsituacao: 1, idempresa: 1, idpai: 0, empresa_dsabreviatura: "HT01" },
  { iduhtipo: 2, cduhtipo: "SUP", nmuhtipo: "Superior", dsuhtipo: "Quarto superior com vista", iduhtipogrupo: 1, qtleito: 2, dhinclusao: "", dhalteracao: "", fltipocobranca: 1, iduhtipogrupo_1: 1, nmtipogrupo: GRUPOS[0], flsituacao: 1, idempresa: 1, idpai: 0, empresa_dsabreviatura: "HT01" },
  { iduhtipo: 3, cduhtipo: "LXO", nmuhtipo: "Luxo", dsuhtipo: "Quarto luxo com amenidades premium", iduhtipogrupo: 2, qtleito: 3, dhinclusao: "", dhalteracao: "", fltipocobranca: 1, iduhtipogrupo_1: 2, nmtipogrupo: GRUPOS[1], flsituacao: 1, idempresa: 1, idpai: 0, empresa_dsabreviatura: "HT01" },
  { iduhtipo: 4, cduhtipo: "MST", nmuhtipo: "Master", dsuhtipo: "Suíte master com sala de estar", iduhtipogrupo: 2, qtleito: 4, dhinclusao: "", dhalteracao: "", fltipocobranca: 1, iduhtipogrupo_1: 2, nmtipogrupo: GRUPOS[1], flsituacao: 1, idempresa: 1, idpai: 0, empresa_dsabreviatura: "HT01" },
  { iduhtipo: 5, cduhtipo: "PRS", nmuhtipo: "Presidential", dsuhtipo: "Suíte presidencial completa", iduhtipogrupo: 2, qtleito: 4, dhinclusao: "", dhalteracao: "", fltipocobranca: 2, iduhtipogrupo_1: 2, nmtipogrupo: GRUPOS[1], flsituacao: 1, idempresa: 1, idpai: 0, empresa_dsabreviatura: "HT01" },
  { iduhtipo: 6, cduhtipo: "CHL", nmuhtipo: "Chalé", dsuhtipo: "Chalé independente com varanda", iduhtipogrupo: 3, qtleito: 2, dhinclusao: "", dhalteracao: "", fltipocobranca: 1, iduhtipogrupo_1: 3, nmtipogrupo: GRUPOS[2], flsituacao: 0, idempresa: 1, idpai: 0, empresa_dsabreviatura: "HT01" },
];

let nextId = store.length + 1;

export const mockUhTipoRoutes = {
  GetAll: (params?: unknown) => paginate(store, params as PaginationQueryParams),
  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((u) => u.iduhtipo === id) ?? null;
  },
  "": {
    POST: (body?: unknown) => {
      const data = body as UHTipo;
      store.push({ ...data, iduhtipo: nextId++ });
    },
    PUT: (body?: unknown) => {
      const data = body as UHTipo;
      store = store.map((u) => (u.iduhtipo === data.iduhtipo ? { ...u, ...data } : u));
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((u) => u.iduhtipo !== id);
    },
  },
};
