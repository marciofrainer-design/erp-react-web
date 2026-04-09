import { UhColumns } from "@/domain/uh/types";
import { CrudPage } from "@/components/crud";
import { UhRegister } from "@/pages/uh/UhRegister";
import UhFactory from "@/domain/uh/UhFactory";
import { uhRegisterSchema } from "@/domain/uh/validation";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useTranslatedColumns } from "@/hooks";

export function UhPage() {
  const { t } = useAppTranslation("uh");
  const tableColumns = useTranslatedColumns("uh", UhColumns);
  const dependencies = UhFactory.dependencies();
  const { uhTipoRepository, edificacaoRepository } = dependencies;

  return (
    <CrudPage
      title={t("crud.title")}
      pageDescription={t("crud.subtitle")}
      tableColumns={tableColumns}
      createNewItem={() => UhFactory.createBlankUh()}
      dependencies={dependencies}
      validate={(data) => uhRegisterSchema.safeParse(data).success}
      register={({ mode, data, onChange }) => (
        <UhRegister
          mode={mode}
          data={data}
          onChange={onChange}
          repositories={{ uhTipoRepository, edificacaoRepository }}
        />
      )}
    />
  );
}
