import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Checkin, CheckinAll } from "@/domain/checkin/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";
import { MOCK_HOSPEDE_NAMES, MOCK_UH_CODES } from "@/mocks/sharedMockData";

faker.seed(50);

const toCheckinAll = (checkin: Checkin): CheckinAll => ({
  ...checkin,
  hospede_nmnome: faker.helpers.arrayElement(MOCK_HOSPEDE_NAMES),
  uh_cduh: faker.helpers.arrayElement(MOCK_UH_CODES),
  empresa_dsabreviatura: `HT${String(checkin.idempresa).padStart(2, "0")}`,
});

const generateCheckoutDate = (checkinDate: Date): string | null => {
  const hasCheckout = faker.datatype.boolean({ probability: 0.6 });
  if (!hasCheckout) return null;
  const checkout = new Date(checkinDate);
  checkout.setDate(
    checkout.getDate() + faker.number.int({ min: 1, max: 10 }),
  );
  return checkout.toISOString();
};

let store: Checkin[] = Array.from({ length: 20 }, (_, i) => {
  const checkinDate = faker.date.between({
    from: "2025-01-01",
    to: "2026-04-01",
  });
  return {
    id: i + 1,
    idcheckin: i + 1,
    idreserva: faker.number.int({ min: 1, max: 25 }),
    idempresa: faker.number.int({ min: 1, max: 3 }),
    dtcheckin: checkinDate.toISOString(),
    dtcheckout: generateCheckoutDate(checkinDate),
    isativo: faker.helpers.arrayElement([1, 1, 1, 0]),
  };
});

let nextId = store.length + 1;

export const mockCheckinRoutes = {
  GetAll: (params?: unknown) =>
    paginate(store.map(toCheckinAll), params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((c) => c.idcheckin === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as Checkin;
      const newId = nextId++;
      const novo: Checkin = {
        id: newId,
        idcheckin: newId,
        idreserva: data.idreserva,
        idempresa: data.idempresa ?? 1,
        dtcheckin: data.dtcheckin,
        dtcheckout: data.dtcheckout ?? null,
        isativo: data.isativo ?? 1,
      };
      store.push(novo);
    },
    PUT: (body?: unknown) => {
      const data = body as Checkin;
      store = store.map((c) =>
        c.idcheckin === data.idcheckin ? { ...c, ...data } : c,
      );
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((c) => c.idcheckin !== id);
    },
  },
};
