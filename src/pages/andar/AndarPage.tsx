import { useEffect, useState, useCallback } from "react";
import type { Andar } from "@/domain/andar/types";
import { AndarColumns } from "@/domain/andar/types";
import { CrudPage } from "@/components/crud/CrudPage";
import { AndarRegister } from "@/pages/andar/AndarRegister";
import type { AndarDependencies } from "@/domain/andar/types";

type AndarPageProps = {
  dependencies: AndarDependencies;
};

export function AndarPage({ dependencies }: AndarPageProps) {
  const andarRepository = dependencies.andarRepository;
  const [andarData, setAndarData] = useState<Andar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(true);
  const [editingAndar, setEditingAndar] = useState<Andar | undefined>(
    undefined,
  );

  const fetchAndarData = useCallback(async () => {
    try {
      setLoading(true);
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
      dependencies={{ andarRepository, primaryKeyName: "idandar" }}
      register={
        isRegisterOpen ? (
          <AndarRegister initialData={editingAndar} />
        ) : undefined
      }
    />
  );
}
