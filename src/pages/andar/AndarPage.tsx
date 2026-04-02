import { AndarColumns } from "@/domain/andar/types";
import { CrudPage } from "@/components/crud";
import { AndarRegister } from "@/pages/andar/AndarRegister";
import AndarFactory from "@/domain/andar/andarFactory";
import { andarRegisterSchema } from "@/domain/andar/validation";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useTranslatedColumns } from "@/hooks";

export function AndarPage() {
  const { t } = useAppTranslation("andar");
  const tableColumns = useTranslatedColumns("andar", AndarColumns);

  return (
    <CrudPage
      title={t("crud.title")}
      pageDescription={t("crud.subtitle")}
      tableColumns={tableColumns}
      createNewItem={AndarFactory.createBlankAndar}
      dependencies={AndarFactory.dependencies()}
      validate={(data) => andarRegisterSchema.safeParse(data).success}
      register={({ mode, data, onChange }) => (
        <AndarRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
