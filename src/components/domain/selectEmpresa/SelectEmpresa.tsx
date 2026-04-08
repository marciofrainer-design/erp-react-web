import { EmpresaRepository } from "@/domain/empresa/EmpresaRepository";
import { useEffect, useMemo } from "react";
import { getAdapter } from "@/infra/factories/adapterFactory";
import type { Empresa } from "@/domain/empresa/types";
import SelectBase from "@/components/select/SelectBase";
import { Building2 } from "lucide-react";
import type { SelectEmpresaProps } from "./types";
import { Loading } from "@/components/loading/Loading";
import { useNotify } from "@/hooks";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useFetchAll } from "@/hooks/useFetchAll";

const createDefaultRepository = () => new EmpresaRepository(getAdapter());

const SelectEmpresa = ({ onSelect, repository }: SelectEmpresaProps) => {
  const { t } = useAppTranslation(["components", "crud"]);
  const notify = useNotify();

  const repo = useMemo(
    () => repository ?? createDefaultRepository(),
    [repository],
  );

  const { data: empresaData, loading, error } = useFetchAll<Empresa>(repo);

  useEffect(() => {
    if (error) {
      notify.error(t("notifications.loadingDataError", { ns: "crud" }));
    }
  }, [error, notify, t]);

  if (loading) {
    return (
      <Loading
        variant="inline"
        size="sm"
        title={t("selects.loading.title", { ns: "components" })}
        description={t("selects.loading.description", { ns: "components" })}
        className="min-h-16"
      />
    );
  }

  return (
    <SelectBase
      label={t("selects.labelCompany", { ns: "components" })}
      options={empresaData.map((e) => ({
        value: e.idempresa.toString(),
        label: e.nmfantasia,
      }))}
      onChange={(value) => onSelect(value)}
      Icon={Building2}
    />
  );
};

export default SelectEmpresa;
