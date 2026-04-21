import { faker } from "@faker-js/faker/locale/pt_BR";
import type { UHClassificacao } from "@/domain/uhclassificacao/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

faker.seed(55);

let store: UHClassificacao[] = [
  { id: 1, iduhclassificacao: 1, idempresa: 1, dsidentificador: "STD", nmclassificacao: "Standard", isativo: 1 },
  { id: 2, iduhclassificacao: 2, idempresa: 1, dsidentificador: "SUP", nmclassificacao: "Superior", isativo: 1 },
  { id: 3, iduhclassificacao: 3, idempresa: 1, dsidentificador: "LXO", nmclassificacao: "Luxo", isativo: 1 },
  { id: 4, iduhclassificacao: 4, idempresa: 1, dsidentificador: "MST", nmclassificacao: "Master", isativo: 1 },
  { id: 5, iduhclassificacao: 5, idempresa: 1, dsidentificador: "PRS", nmclassificacao: "Presidential", isativo: 0 },
];

let nextId = store.length + 1;

export const mockUHClassificacaoRoutes = {
  GetAll: (params?: unknown) => paginate(store, params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((c) => c.iduhclassificacao === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as UHClassificacao;
      const novo: UHClassificacao = { ...data, id: nextId, iduhclassificacao: nextId++ };
      store.push(novo);
    },
    PUT: (body?: unknown) => {
      const data = body as UHClassificacao;
      store = store.map((c) =>
        c.iduhclassificacao === data.iduhclassificacao ? { ...c, ...data } : c,
      );
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((c) => c.iduhclassificacao !== id);
    },
  },
};
