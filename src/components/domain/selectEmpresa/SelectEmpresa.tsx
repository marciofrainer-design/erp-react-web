import { EmpresaRepository } from "@/domain/empresa/EmpresaRepository";
import { useEffect, useState } from "react";
import { DataSnapAdapter } from "@/infra/api/service";
import type { Empresa } from "@/domain/empresa/types";
import SelectBase from "@/components/select/SelectBase";
import { Building2 } from "lucide-react";
import type { SelectEmpresaProps } from "./types";
import { Loading } from "@/components/ui/loading";

const SelectEmpresa = ({ onSelect }: SelectEmpresaProps) => {
  const [empresaData, setEmpresaData] = useState<Empresa[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpresaData = async () => {
      setLoading(true);
      try {
        const apiAdapter = new DataSnapAdapter();
        const empresaRepository = new EmpresaRepository(apiAdapter);
        const data = await empresaRepository.getAll();
        setEmpresaData(data);
      } catch (err) {
        console.error("Erro ao buscar dados de empresa:", err);
        setError("Erro ao carregar dados de empresa");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, []); // Evita loop infinito, só refaz a busca se o número de empresas mudar

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

  if (error) {
    return <div>{error}</div>;
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
