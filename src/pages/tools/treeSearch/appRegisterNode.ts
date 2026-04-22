import type { AppServiceNode } from "./types";

const APP_REGISTER_NODE = (): AppServiceNode => ({
  id: "records",
  labelKey: "appSearch.tree.records",
  children: [
    {
      id: "records-floor",
      labelKey: "appSearch.tree.floor",
      formOption: "floor",
      enabled: true,
    },
    {
      id: "records-uh",
      labelKey: "appSearch.tree.uh",
      formOption: "uh",
      enabled: true,
    },
    {
      id: "records-edificacao",
      labelKey: "appSearch.tree.edificacao",
      formOption: "edificacao",
      enabled: true,
    },
    {
      id: "records-uhclassificacao",
      labelKey: "appSearch.tree.uhclassificacao",
      formOption: "uhclassificacao",
      enabled: true,
    },
    {
      id: "records-hospedes",
      labelKey: "appSearch.tree.hospedes",
      formOption: "hospedes",
      enabled: true,
    },
    {
      id: "records-reservas",
      labelKey: "appSearch.tree.reservas",
      formOption: "reservas",
      enabled: true,
    },
    {
      id: "records-checkin",
      labelKey: "appSearch.tree.checkin",
      formOption: "checkin",
      enabled: true,
    },
  ],
});

export { APP_REGISTER_NODE };
