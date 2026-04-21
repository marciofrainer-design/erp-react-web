import { useAppTranslation } from "@/i18n/useAppTranslation";
import type { AppNamespace } from "@/i18n/namespaces";
import { useTranslatedColumns } from "@/hooks";
import type { TranslatableColumn } from "@/hooks/useTranslatedColumns";
import type { EntityBase } from "@/types";
import type { CrudPageProps } from "./types";
import CrudPage from "./CrudPage";

type CrudPageBaseProps<T extends EntityBase, TList extends EntityBase = T> = Omit<
  CrudPageProps<T, TList>,
  "title" | "pageDescription" | "tableColumns"
> & {
  namespace: AppNamespace;
  columns: TranslatableColumn<TList>[];
};

const CrudPageBase = <T extends EntityBase, TList extends EntityBase = T>({
  namespace,
  columns,
  ...props
}: CrudPageBaseProps<T, TList>) => {
  const { t } = useAppTranslation(namespace);
  const tableColumns = useTranslatedColumns(namespace, columns);

  return (
    <CrudPage<T, TList>
      title={t("crud.title")}
      pageDescription={t("crud.subtitle")}
      tableColumns={tableColumns}
      {...props}
    />
  );
};

export default CrudPageBase;
export type { CrudPageBaseProps };
