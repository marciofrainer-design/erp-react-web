import "i18next";

import { defaultNS, resources } from "./resources/index";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["pt-BR"];
    returnNull: false;
  }
}
