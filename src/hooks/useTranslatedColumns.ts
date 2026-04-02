import { useMemo } from "react";

import { useAppTranslation } from "@/i18n/useAppTranslation";
import type { AppNamespace } from "@/i18n/namespaces";
import type { Column } from "@/types";

export type TranslatableColumn<T extends object> = Omit<Column<T>, "label"> & {
  labelKey: string;
};

export function useTranslatedColumns<T extends object>(
  namespace: AppNamespace,
  columns: TranslatableColumn<T>[],
): Column<T>[] {
  const { t } = useAppTranslation(namespace);

  return useMemo(
    () =>
      columns.map(({ labelKey, ...column }) => ({
        ...column,
        label: t(labelKey, labelKey) as string,
      })),
    [columns, t],
  );
}
