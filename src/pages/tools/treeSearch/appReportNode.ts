import type { AppServiceNode } from "./types";

const APP_REPORT_NODE = (): AppServiceNode => ({
    id: "reports",
    labelKey: "appSearch.tree.reports",
    children: [
      {
        id: "report-occupancy",
        labelKey: "appSearch.tree.occupancy",
        enabled: false,
      },
      {
        id: "report-average-daily-rate",
        labelKey: "appSearch.tree.averageDailyRate",
        enabled: false,
      },
    ],
  });

export { APP_REPORT_NODE };
