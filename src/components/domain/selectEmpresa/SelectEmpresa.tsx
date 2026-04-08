import { EmpresaRepository } from "@/domain/empresa/EmpresaRepository";
import { useEffect, useMemo, useState } from "react";
import { DataSnapAdapter } from "@/infra/api/service";
import type { Empresa } from "@/domain/empresa/types";
import SelectBase from "@/components/select/SelectBase";
import { Building2 } from "lucide-react";
import type { SelectEmpresaProps } from "./types";
import { Loading } from "@/components/loading/Loading";
import { useNotify } from "@/hooks";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { getErrorMessage } from "@/utils";

const createDefaultRepository = () =>
  new EmpresaRepository(new DataSnapAdapter());

const SelectEmpresa = ({ onSelect, repository }: SelectEmpresaProps) => {
  const { t } = useAppTranslation(["components", "crud"]);
  const notify = useNotify();
  const [empresaData, setEmpresaData] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(false);

  const repo = useMemo(
    () => repository ?? createDefaultRepository(),
    [repository],
  );

  useEffect(() => {
    const fetchEmpresaData = async () => {
      setLoading(true);
      try {
        const result = await repo.getAll({ page: 1, pageCount: 1, limit: 100 });
        setEmpresaData(result.data);
      } catch (err: unknown) {
        notify.error(
          `${t("notifications.loadingDataError", { defaultValue: "Erro ao carregar dados" })}: ${getErrorMessage(err)}`,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, [repo, notify, t]);

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
