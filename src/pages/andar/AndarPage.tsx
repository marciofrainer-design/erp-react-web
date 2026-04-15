import { AndarColumns } from "@/domain/andar/types";
import type { Andar, AndarAll } from "@/domain/andar/types";
import { CrudPage } from "@/components/crud";
import { AndarRegister } from "@/pages/andar/AndarRegister";
import AndarFactory from "@/domain/andar/AndarFactory";
import { andarRegisterSchema } from "@/domain/andar/validation";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useTranslatedColumns } from "@/hooks";

export function AndarPage() {
  const { t } = useAppTranslation("andar");
  const tableColumns = useTranslatedColumns("andar", AndarColumns);
  const dependencies = AndarFactory.dependencies();

  return (
    <CrudPage<Andar, AndarAll>
      title={t("crud.title")}
      pageDescription={t("crud.subtitle")}
      tableColumns={tableColumns}
      createNewItem={() => AndarFactory.createBlankAndar()}
      dependencies={dependencies}
      validate={(data) => andarRegisterSchema.safeParse(data).success}
      register={({ mode, data, onChange }) => (
        <AndarRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
