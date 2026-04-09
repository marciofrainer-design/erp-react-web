import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Uh } from "@/domain/uh/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

faker.seed(42);

const ANDARES = ["Térreo", "1º Andar", "2º Andar", "3º Andar", "4º Andar"];
const TIPOS_UH = ["Standard", "Superior", "Luxo", "Master", "Suite"];
const EDIFICACOES = ["Torre A", "Torre B", "Anexo"];

let store: Uh[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  iduh: i + 1,
  idempresa: faker.number.int({ min: 1, max: 3 }),
  empresa_dsabreviatura: faker.helpers.arrayElement(["HT01", "HT02", "HT03"]),
  cduh: `UH${String(i + 1).padStart(3, "0")}`,
  dsuh: `Unidade ${i + 1}`,
  isativo: faker.helpers.arrayElement([1, 1, 1, 0]),
  isacessibilidade: faker.helpers.arrayElement([0, 0, 1]),
  iduhtipo: faker.number.int({ min: 1, max: 5 }),
  nmuhtipo: faker.helpers.arrayElement(TIPOS_UH),
  nmandar: faker.helpers.arrayElement(ANDARES),
  nmedificacao: faker.helpers.arrayElement(EDIFICACOES),
  qtquarto: faker.number.int({ min: 1, max: 4 }),
  iduhclassificacao: faker.number.int({ min: 1, max: 5 }),
}));

let nextId = store.length + 1;

export const mockUhRoutes = {
  GetAll: (params?: unknown) => paginate(store, params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((u) => u.iduh === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as Uh;
      const nova: Uh = { ...data, id: nextId, iduh: nextId++ };
      store.push(nova);
    },
    PUT: (body?: unknown) => {
      const data = body as Uh;
      store = store.map((u) => (u.iduh === data.iduh ? { ...u, ...data } : u));
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((u) => u.iduh !== id);
    },
  },
};
