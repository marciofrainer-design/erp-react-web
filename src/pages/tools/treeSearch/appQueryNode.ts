import type { AppServiceNode } from "./types";

const APP_QUERY_NODE = (): AppServiceNode => ({
  id: "queries",
  labelKey: "appSearch.tree.queries",
  children: [
    {
      id: "query-reservations",
      labelKey: "appSearch.tree.reservations",
      enabled: false,
    },
    {
      id: "query-guests",
      labelKey: "appSearch.tree.guests",
      enabled: false,
    },
  ],
});

export { APP_QUERY_NODE };
