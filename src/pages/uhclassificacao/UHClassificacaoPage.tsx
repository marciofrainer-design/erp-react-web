import { UHClassificacaoColumns } from "@/domain/uhclassificacao/types";
import { UhColumns } from "@/domain/uh/types";
import { CrudPage } from "@/components/crud";
import CrudRegisterTabs from "@/components/crud/tabs/CrudRegisterTabs";
import CrudDetailSection from "@/components/crud/tabs/CrudDetailSection";
import { UHClassificacaoFields } from "@/pages/uhclassificacao/UHClassificacaoFields";
import { UhDetailRegister } from "@/pages/uhclassificacao/tabs/UhDetailRegister";
import UHClassificacaoFactory from "@/domain/uhclassificacao/UHClassificacaoFactory";
import UhFactory from "@/domain/uh/UhFactory";
import { uhclassificacaoRegisterSchema } from "@/domain/uhclassificacao/validation";
import { uhRegisterSchema } from "@/domain/uh/validation";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useTranslatedColumns } from "@/hooks";
import { BedDouble } from "lucide-react";
import { useMemo } from "react";
import type { Uh } from "@/domain/uh/types";

export function UHClassificacaoPage() {
  const { t } = useAppTranslation(["uhclassificacao", "uh"]);
  const tableColumns = useTranslatedColumns("uhclassificacao", UHClassificacaoColumns);
  const uhColumns = useTranslatedColumns("uh", UhColumns);
  const dependencies = UHClassificacaoFactory.dependencies();

  const uhDependencies = useMemo(() => UhFactory.dependencies(), []);

  return (
    <CrudPage
      title={t("crud.title")}
      pageDescription={t("crud.subtitle")}
      tableColumns={tableColumns}
      createNewItem={() => UHClassificacaoFactory.createBlankUHClassificacao()}
      dependencies={dependencies}
      validate={(data) => uhclassificacaoRegisterSchema.safeParse(data).success}
      register={({ mode, data, onChange }) => (
        <CrudRegisterTabs
          title={data.iduhclassificacao ? t("crud.editLabel") : t("crud.createLabel")}
          description={t("crud.subtitle")}
          masterContent={<UHClassificacaoFields data={data} mode={mode} onChange={onChange} />}
          detailsDisabled={mode === "new"}
          details={[
            {
              value: "uhs",
              label: t("crud.title", { ns: "uh" }),
              icon: BedDouble,
              content: (
                <CrudDetailSection<Uh>
                  repository={uhDependencies.repository}
                  columns={uhColumns}
                  parentIdField="iduhclassificacao"
                  parentId={data.iduhclassificacao}
                  primaryKeyName="iduh"
                  createBlankItem={(parentId) => ({
                    ...UhFactory.createBlankUh(),
                    iduhclassificacao: Number(parentId),
                  })}
                  validate={(uh) => uhRegisterSchema.safeParse(uh).success}
                  register={(detailProps) => (
                    <UhDetailRegister
                      {...detailProps}
                      repositories={{
                        uhTipoRepository: uhDependencies.uhTipoRepository,
                        edificacaoRepository: uhDependencies.edificacaoRepository,
                      }}
                    />
                  )}
                />
              ),
            },
          ]}
        />
      )}
    />
  );
}
