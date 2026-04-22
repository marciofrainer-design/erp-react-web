import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Hospede, HospedeAll } from "@/domain/hospede/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

faker.seed(10);

const toHospedeAll = (hospede: Hospede): HospedeAll => ({
  ...hospede,
  empresa_dsabreviatura: `HT${String(hospede.idempresa).padStart(2, "0")}`,
});

let store: Hospede[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  idhospede: i + 1,
  idempresa: faker.number.int({ min: 1, max: 3 }),
  nmnome: faker.person.fullName(),
  cpcpf: faker.string.numeric(11),
  dtnascimento: faker.date
    .birthdate({ min: 18, max: 80, mode: "age" })
    .toISOString()
    .substring(0, 10),
  nmtelefone: faker.phone.number(),
  nmemail: faker.internet.email(),
  isativo: faker.helpers.arrayElement([1, 1, 1, 0]),
}));

let nextId = store.length + 1;

export const mockHospedeRoutes = {
  GetAll: (params?: unknown) =>
    paginate(store.map(toHospedeAll), params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((h) => h.idhospede === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as Hospede;
      const newId = nextId++;
      const novo: Hospede = {
        id: newId,
        idhospede: newId,
        idempresa: data.idempresa ?? 1,
        nmnome: data.nmnome,
        cpcpf: data.cpcpf,
        dtnascimento: data.dtnascimento,
        nmtelefone: data.nmtelefone,
        nmemail: data.nmemail,
        isativo: data.isativo ?? 1,
      };
      store.push(novo);
    },
    PUT: (body?: unknown) => {
      const data = body as Hospede;
      store = store.map((h) =>
        h.idhospede === data.idhospede ? { ...h, ...data } : h,
      );
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((h) => h.idhospede !== id);
    },
  },
};
