import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Empresa } from "@/domain/empresa/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

faker.seed(10);

let store: Empresa[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  idempresa: i + 1,
  nmfantasia: faker.company.name(),
  cnpj: faker.string.numeric(14),
  isativo: faker.helpers.arrayElement([1, 1, 1, 0]),
}));

let nextId = store.length + 1;

export const mockEmpresaRoutes = {
  GetAll: (params?: unknown) => paginate(store, params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((e) => e.idempresa === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as Empresa;
      const nova: Empresa = { ...data, id: nextId, idempresa: nextId++ };
      store.push(nova);
    },
    PUT: (body?: unknown) => {
      const data = body as Empresa;
      store = store.map((e) => (e.idempresa === data.idempresa ? { ...e, ...data } : e));
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((e) => e.idempresa !== id);
    },
  },
};
