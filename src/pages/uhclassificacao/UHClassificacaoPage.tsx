import { UHClassificacaoColumns } from "@/domain/uhclassificacao/types";
import { CrudPage } from "@/components/crud";
import { UHClassificacaoRegister } from "@/pages/uhclassificacao/UHClassificacaoRegister";
import UHClassificacaoFactory from "@/domain/uhclassificacao/UHClassificacaoFactory";
import { uhclassificacaoRegisterSchema } from "@/domain/uhclassificacao/validation";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useTranslatedColumns } from "@/hooks";

export function UHClassificacaoPage() {
  const { t } = useAppTranslation("uhclassificacao");
  const tableColumns = useTranslatedColumns("uhclassificacao", UHClassificacaoColumns);
  const dependencies = UHClassificacaoFactory.dependencies();

  return (
    <CrudPage
      title={t("crud.title")}
      pageDescription={t("crud.subtitle")}
      tableColumns={tableColumns}
      createNewItem={() => UHClassificacaoFactory.createBlankUHClassificacao()}
      dependencies={dependencies}
      validate={(data) => uhclassificacaoRegisterSchema.safeParse(data).success}
      register={({ mode, data, onChange }) => (
        <UHClassificacaoRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
