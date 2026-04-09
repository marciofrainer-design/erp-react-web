import { CrudRegister } from "@/components/crud";
import { UHClassificacaoFields } from "./UHClassificacaoFields";
import type { UHClassificacaoRegisterProps } from "./types";
import { useAppTranslation } from "@/i18n/useAppTranslation";

export function UHClassificacaoRegister({ data, mode, onChange }: UHClassificacaoRegisterProps) {
  const { t } = useAppTranslation("uhclassificacao");

  return (
    <CrudRegister
      title={data.iduhclassificacao ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
    >
      <UHClassificacaoFields data={data} mode={mode} onChange={onChange} />
    </CrudRegister>
  );
}
