import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Edificacao } from "@/domain/edificacao/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

faker.seed(42);

let store: Edificacao[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  idedificacao: i + 1,
  idempresa: faker.number.int({ min: 1, max: 2 }),
  empresa_dsabreviatura: faker.helpers.arrayElement(["HT01", "HT02"]),
  cdedificacao: faker.string.alphanumeric(4).toUpperCase(),
  nmedificacao: `Edificação ${faker.location.buildingNumber()}`,
  isativo: faker.helpers.arrayElement([1, 1, 1, 0]),
}));

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
