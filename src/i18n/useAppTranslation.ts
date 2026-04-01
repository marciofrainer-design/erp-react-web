import { useTranslation } from "react-i18next";

import type { AppNamespace } from "./namespaces";

export function useAppTranslation(namespace?: AppNamespace | AppNamespace[]) {
  return useTranslation(namespace);
}
