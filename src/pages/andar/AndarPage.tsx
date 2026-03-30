import { useEffect, useState, useCallback, useMemo } from "react";
import type { Andar } from "@/domain/andar/types";
import { AndarColumns } from "@/domain/andar/types";
import { CrudPage } from "@/components/crud/CrudPage";
import { AndarRegister } from "@/pages/andar/AndarRegister";
import AndarFactory from "@/domain/andar/andarFactory";

export function AndarPage() {
  const [andarData, setAndarData] = useState<Andar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dependencies = useMemo(() => AndarFactory.dependencies(), []);
  const andarRepository = dependencies.repository;

  const fetchAndarData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await andarRepository.getAll();
      setAndarData(data);
    } catch (err) {
      console.error("Erro ao buscar dados de Andar:", err);
      setError("Erro ao carregar dados de Andar");
    } finally {
      setLoading(false);
    }
  }, [andarRepository]);

  useEffect(() => {
    fetchAndarData();
  }, [fetchAndarData]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <CrudPage
      title="Cadastro de Andar"
      pageDescription="Gerencie os andares do seu estabelecimento"
      tableColumns={AndarColumns}
      tableData={andarData}
      createNewItem={AndarFactory.createBlankAndar}
      onSaved={fetchAndarData}
      dependencies={dependencies}
      register={({ mode, data, onChange }) => (
        <AndarRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
