import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Reserva, ReservaAll } from "@/domain/reserva/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";
import { MOCK_HOSPEDE_NAMES, MOCK_UH_CODES } from "@/mocks/sharedMockData";

faker.seed(30);

const toReservaAll = (reserva: Reserva): ReservaAll => ({
  ...reserva,
  hospede_nmnome: faker.helpers.arrayElement(MOCK_HOSPEDE_NAMES),
  uh_cduh: faker.helpers.arrayElement(MOCK_UH_CODES),
  empresa_dsabreviatura: `HT${String(reserva.idempresa).padStart(2, "0")}`,
});

const generateCheckOutDate = (checkIn: Date): string => {
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + faker.number.int({ min: 1, max: 14 }));
  return checkOut.toISOString().substring(0, 10);
};

let store: Reserva[] = Array.from({ length: 25 }, (_, i) => {
  const dtentrada = faker.date
    .between({ from: "2025-01-01", to: "2026-12-31" })
    .toISOString()
    .substring(0, 10);
  return {
    id: i + 1,
    idreserva: i + 1,
    idempresa: faker.number.int({ min: 1, max: 3 }),
    idhospede: faker.number.int({ min: 1, max: 30 }),
    iduh: faker.number.int({ min: 1, max: 30 }),
    dtentrada,
    dtsaida: generateCheckOutDate(new Date(dtentrada)),
    nmobservacao: faker.helpers.arrayElement([
      "",
      faker.lorem.sentence(),
      "Solicita quarto no andar alto",
      "Chegada tarde",
      "",
    ]),
    isativo: faker.helpers.arrayElement([1, 1, 1, 0]),
  };
});

let nextId = store.length + 1;

export const mockReservaRoutes = {
  GetAll: (params?: unknown) =>
    paginate(store.map(toReservaAll), params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((r) => r.idreserva === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as Reserva;
      const newId = nextId++;
      const nova: Reserva = {
        id: newId,
        idreserva: newId,
        idempresa: data.idempresa ?? 1,
        idhospede: data.idhospede,
        iduh: data.iduh,
        dtentrada: data.dtentrada,
        dtsaida: data.dtsaida,
        nmobservacao: data.nmobservacao ?? "",
        isativo: data.isativo ?? 1,
      };
      store.push(nova);
    },
    PUT: (body?: unknown) => {
      const data = body as Reserva;
      store = store.map((r) =>
        r.idreserva === data.idreserva ? { ...r, ...data } : r,
      );
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((r) => r.idreserva !== id);
    },
  },
};
