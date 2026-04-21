import type { Edificacao } from "@/domain/edificacao/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

let store: Edificacao[] = [
  { id: 1, idedificacao: 1, idempresa: 1, empresa_dsabreviatura: "HT01", cdedificacao: "PRIN", nmedificacao: "Edificação Principal", isativo: 1 },
  { id: 2, idedificacao: 2, idempresa: 1, empresa_dsabreviatura: "HT01", cdedificacao: "ANEX", nmedificacao: "Anexo Leste", isativo: 1 },
  { id: 3, idedificacao: 3, idempresa: 1, empresa_dsabreviatura: "HT01", cdedificacao: "CHAL", nmedificacao: "Bloco de Chalés", isativo: 1 },
  { id: 4, idedificacao: 4, idempresa: 1, empresa_dsabreviatura: "HT01", cdedificacao: "SPA", nmedificacao: "SPA e Lazer", isativo: 1 },
  { id: 5, idedificacao: 5, idempresa: 2, empresa_dsabreviatura: "HT02", cdedificacao: "PRIN", nmedificacao: "Torre Principal", isativo: 1 },
  { id: 6, idedificacao: 6, idempresa: 2, empresa_dsabreviatura: "HT02", cdedificacao: "RES", nmedificacao: "Residencial Oeste", isativo: 0 },
];

let nextId = store.length + 1;

export const mockEdificacaoRoutes = {
  GetAll: (params?: unknown) => paginate(store, params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((e) => e.idedificacao === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as Edificacao;
      const novo: Edificacao = { ...data, id: nextId, idedificacao: nextId++ };
      store.push(novo);
    },
    PUT: (body?: unknown) => {
      const data = body as Edificacao;
      store = store.map((e) => (e.idedificacao === data.idedificacao ? { ...e, ...data } : e));
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((e) => e.idedificacao !== id);
    },
  },
};
