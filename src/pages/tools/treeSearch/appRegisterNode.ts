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
      id: "records-apartment",
      labelKey: "appSearch.tree.apartment",
      enabled: false,
    },
  ],
});

export { APP_REGISTER_NODE };
