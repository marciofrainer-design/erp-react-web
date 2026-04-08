import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Andar } from "@/domain/andar/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

faker.seed(20);

let store: Andar[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  idandar: i + 1,
  idempresa: faker.number.int({ min: 1, max: 12 }),
  nmempresa: faker.company.name(),
  cdandar: faker.string.alphanumeric(4).toUpperCase(),
  nmandar: `Andar ${i + 1}`,
  isativo: faker.helpers.arrayElement([1, 1, 1, 0]),
}));

let nextId = store.length + 1;

export const mockAndarRoutes = {
  GetAll: (params?: unknown) => paginate(store, params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((a) => a.idandar === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as Andar;
      const novo: Andar = { ...data, id: nextId, idandar: nextId++ };
      store.push(novo);
    },
    PUT: (body?: unknown) => {
      const data = body as Andar;
      store = store.map((a) => (a.idandar === data.idandar ? { ...a, ...data } : a));
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((a) => a.idandar !== id);
    },
  },
};
