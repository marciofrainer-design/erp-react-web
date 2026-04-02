import { useTranslation } from "react-i18next";

import type { AppNamespace } from "./namespaces";

type UseTranslationNamespace = Parameters<typeof useTranslation>[0];

export function useAppTranslation(namespace?: AppNamespace | AppNamespace[]) {
  return useTranslation(namespace as UseTranslationNamespace);
}
