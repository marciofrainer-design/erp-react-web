import CrudRegisterTabs from "@/components/crud/tabs/CrudRegisterTabs";
import { UhRegister } from "./UhRegister";
import { SelectionList } from "@/components/selectionList";
import type { Caracteristica } from "@/domain/caracteristica/types";
import { CaracteristicaColumns } from "@/domain/caracteristica/types";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useTranslatedColumns } from "@/hooks";
import type { UhTabsProps } from "./types";
import { CARACTERISTICA_MAPPER } from "./consts";

const UhTabs = ({ mode, data, onChange, repositories }: UhTabsProps) => {
  const { t } = useAppTranslation(["uh", "caracteristica"]);
  const caracteristicaColumns = useTranslatedColumns("caracteristica", CaracteristicaColumns);

  return (
    <CrudRegisterTabs
      title={data.iduh ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
      detailsDisabled={mode === "new"}
      masterContent={
        <UhRegister
          mode={mode}
          data={data}
          onChange={onChange}
          repositories={{
            uhTipoRepository: repositories.uhTipoRepository,
            edificacaoRepository: repositories.edificacaoRepository,
          }}
        />
      }
      details={[
        {
          value: "caracteristicas",
          label: t("crud.title", { ns: "caracteristica" }),
          content: (
            <SelectionList<Caracteristica>
              repository={repositories.caracteristicaRepository}
              mapper={CARACTERISTICA_MAPPER}
              columns={caracteristicaColumns}
              primaryKeyField="idcaracteristica"
              value={data.caracteristicas ?? []}
              onChange={(items) => onChange("caracteristicas", items)}
              label={t("inputs.nameLabel", { ns: "caracteristica" })}
            />
          ),
        },
      ]}
    />
  );
};

export default UhTabs;
