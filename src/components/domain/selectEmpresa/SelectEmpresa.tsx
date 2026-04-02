import { EmpresaRepository } from "@/domain/empresa/EmpresaRepository";
import { useEffect, useState } from "react";
import { DataSnapAdapter } from "@/infra/api/service";
import type { Empresa } from "@/domain/empresa/types";
import SelectBase from "@/components/select/SelectBase";
import { Building2 } from "lucide-react";
import type { SelectEmpresaProps } from "./types";
import { Loading } from "@/components/loading/Loading";
import { useNotify } from "@/hooks";
import type { AxiosError } from "axios";

const SelectEmpresa = ({ onSelect }: SelectEmpresaProps) => {
  const notify = useNotify();
  const [empresaData, setEmpresaData] = useState<Empresa[]>([]);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmpresaData = async () => {
      setLoading(true);
      try {
        const apiAdapter = new DataSnapAdapter();
        const empresaRepository = new EmpresaRepository(apiAdapter);
        const data = await empresaRepository.getAll();
        setEmpresaData(data);
      } catch (err: AxiosError | unknown) {
        notify.error(`Erro ao carregar dados: ${(err as AxiosError).message || err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, [notify]);

  if (loading) {
    return (
      <Loading
        variant="inline"
        size="sm"
        title="Carregando empresas"
        description="Buscando estabelecimentos disponiveis"
        className="min-h-16"
      />
    );
  }

  return (
    <SelectBase
      label="Estabelecimento"
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
