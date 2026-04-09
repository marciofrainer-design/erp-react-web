import { EmpresaRepository } from "@/domain/empresa/EmpresaRepository";
import { useEffect, useMemo, useState } from "react";
import { getAdapter } from "@/infra/factories/adapterFactory";
import type { Empresa } from "@/domain/empresa/types";
import SelectBase from "@/components/select/SelectBase";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [value, setValue] = useState<string>("");

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

  const selectedLabel = empresaData.find(
    (e) => e.idempresa.toString() === value,
  )?.nmfantasia;

  return (
    <SelectBase
      label={t("selects.labelCompany", { ns: "components" })}
      Icon={Building2}
      value={value}
      onValueChange={(v: string) => {
        setValue(v);
        onSelect(v);
      }}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={t("selects.labelDefault", { ns: "components" })}
        >
          {selectedLabel || undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {empresaData.map((e) => (
            <SelectItem key={e.idempresa} value={e.idempresa.toString()}>
              {e.nmfantasia}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectBase>
  );
};

export default SelectEmpresa;
