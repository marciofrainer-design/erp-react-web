import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Caracteristica } from "@/domain/caracteristica/types";
import { paginate } from "@/mocks/MockAdapter";
import type { PaginationQueryParams } from "@/infra/interface/types";

faker.seed(77);

let store: Caracteristica[] = [
  { id: 1, idcaracteristica: 1, idempresa: 1, dscaracteristica: "Ar-condicionado",      dsabreviatura: "AR_COND",  fltipo: 1, idcaracteristica_emp: 1, flsituacao: 1, empresa_dsabreviatura: "FAROL", isprincipal: 1 },
  { id: 2, idcaracteristica: 2, idempresa: 1, dscaracteristica: "Wi-Fi",                dsabreviatura: "WIFI",     fltipo: 1, idcaracteristica_emp: 2, flsituacao: 1, empresa_dsabreviatura: "FAROL", isprincipal: 0 },
  { id: 3, idcaracteristica: 3, idempresa: 1, dscaracteristica: "Frigobar",             dsabreviatura: "FRIGOBAR", fltipo: 1, idcaracteristica_emp: 3, flsituacao: 1, empresa_dsabreviatura: "FAROL", isprincipal: 0 },
  { id: 4, idcaracteristica: 4, idempresa: 1, dscaracteristica: "Cofre",                dsabreviatura: "COFRE",    fltipo: 1, idcaracteristica_emp: 4, flsituacao: 1, empresa_dsabreviatura: "FAROL", isprincipal: 0 },
  { id: 5, idcaracteristica: 5, idempresa: 1, dscaracteristica: "Banheira",             dsabreviatura: "BANHEIR",  fltipo: 2, idcaracteristica_emp: 5, flsituacao: 1, empresa_dsabreviatura: "FAROL", isprincipal: 0 },
  { id: 6, idcaracteristica: 6, idempresa: 1, dscaracteristica: "Varanda",              dsabreviatura: "VARANDA",  fltipo: 2, idcaracteristica_emp: 6, flsituacao: 1, empresa_dsabreviatura: "FAROL", isprincipal: 0 },
  { id: 7, idcaracteristica: 7, idempresa: 1, dscaracteristica: "Vista para o mar",     dsabreviatura: "VISTA_M",  fltipo: 3, idcaracteristica_emp: 7, flsituacao: 1, empresa_dsabreviatura: "FAROL", isprincipal: 0 },
  { id: 8, idcaracteristica: 8, idempresa: 1, dscaracteristica: "Vista para a piscina", dsabreviatura: "VISTA_P",  fltipo: 3, idcaracteristica_emp: 8, flsituacao: 1, empresa_dsabreviatura: "FAROL", isprincipal: 0 },
  { id: 9, idcaracteristica: 9, idempresa: 1, dscaracteristica: "Jacuzzi",              dsabreviatura: "JACUZZI",  fltipo: 2, idcaracteristica_emp: 9, flsituacao: 0, empresa_dsabreviatura: "FAROL", isprincipal: 0 },
];

let nextId = store.length + 1;

export const mockCaracteristicaRoutes = {
  GetAll: (params?: unknown) => paginate(store, params as PaginationQueryParams),

  GetById: (params?: unknown) => {
    const { id } = (params as { id: number }) ?? {};
    return store.find((c) => c.idcaracteristica === id) ?? null;
  },

  "": {
    POST: (body?: unknown) => {
      const data = body as Caracteristica;
      const novo: Caracteristica = { ...data, id: nextId, idcaracteristica: nextId++ };
      store.push(novo);
    },
    PUT: (body?: unknown) => {
      const data = body as Caracteristica;
      store = store.map((c) =>
        c.idcaracteristica === data.idcaracteristica ? { ...c, ...data } : c,
      );
    },
    DELETE: (params?: unknown) => {
      const id = params as number;
      store = store.filter((c) => c.idcaracteristica !== id);
    },
  },
};
