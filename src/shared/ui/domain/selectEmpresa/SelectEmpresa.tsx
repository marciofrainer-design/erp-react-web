import { EmpresaRepository } from "@/domain/empresa/EmpresaRepository";
import { useEffect, useState } from "react";
import { DataSnapAdapter } from "@/infra/api/service";
import type { Empresa } from "@/domain/empresa/types";

const SelectEmpresa = () => {
    const apiAdapter = new DataSnapAdapter();
    const empresaRepository = new EmpresaRepository(apiAdapter);

    const [empresaData, setEmpresaData] = useState<Empresa[]>([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmpresaData = async () => {
            setLoading(true);
            try {
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
    }, []);

    if (loading) {
        return <div>Carregando empresas...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    
  return (
    <div className="flex flex-row w-full gap-4 items-center">
      <label className="text-xs font-semibold text-slate-200">
        Estabelecimento
      </label>
      <select className="text-sm bg-slate-800 border-slate-700 text-slate-200 rounded shadow-sm focus:ring-slate-600 focus:border-slate-600 w-full py-1 px-2">
        {empresaData &&
          empresaData.map((e) => (
            <option key={e.idempresa} value={e.idempresa} className="bg-slate-800 text-slate-200">
              {e.nmfantasia}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectEmpresa;
