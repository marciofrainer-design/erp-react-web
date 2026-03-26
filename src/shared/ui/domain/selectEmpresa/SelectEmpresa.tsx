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
      <label className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Estabelecimento
      </label>
      <select className="text-sm rounded shadow-sm w-full py-1 px-2 outline-none"
        style={{
          backgroundColor: 'var(--color-select-bg)',
          color: 'var(--color-select-text)',
          border: '1px solid var(--color-select-border)',
        }}>
        {empresaData &&
          empresaData.map((e) => (
            <option key={e.idempresa} value={e.idempresa}>
              {e.nmfantasia}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectEmpresa;
