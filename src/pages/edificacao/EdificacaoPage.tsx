import { EdificacaoColumns } from "@/domain/edificacao/types";
import { CrudPage } from "@/components/crud";
import { EdificacaoRegister } from "@/pages/edificacao/EdificacaoRegister";
import EdificacaoFactory from "@/domain/edificacao/EdificacaoFactory";
import { edificacaoRegisterSchema } from "@/domain/edificacao/validation";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useTranslatedColumns } from "@/hooks";

export function EdificacaoPage() {
  const { t } = useAppTranslation("edificacao");
  const tableColumns = useTranslatedColumns("edificacao", EdificacaoColumns);
  const dependencies = EdificacaoFactory.dependencies();

  return (
    <CrudPage
      title={t("crud.title")}
      pageDescription={t("crud.subtitle")}
      tableColumns={tableColumns}
      createNewItem={() => EdificacaoFactory.createBlankEdificacao()}
      dependencies={dependencies}
      validate={(data) => edificacaoRegisterSchema.safeParse(data).success}
      register={({ mode, data, onChange }) => (
        <EdificacaoRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
