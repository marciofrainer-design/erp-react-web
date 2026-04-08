import { APP_REGISTER_NODE } from "./appRegisterNode";
import { APP_REPORT_NODE } from "./appReportNode";
import { APP_QUERY_NODE } from "./appQueryNode";
import type { AppServiceNode } from "./types";

export const APP_SERVICE_TREE: AppServiceNode[] = [
  APP_REGISTER_NODE(),
  APP_QUERY_NODE(), 
  APP_REPORT_NODE()
];
