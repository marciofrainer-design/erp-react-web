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
  const [editingAndar, setEditingAndar] = useState<Andar | undefined>(undefined);

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

  const handleSave = async (andar: Andar) => {
    try {
      await andarRepository.save(andar);
      setIsRegisterOpen(false);
      setEditingAndar(undefined);
      await fetchAndarData();
    } catch (err) {
      console.error("Erro ao salvar andar:", err);
      alert("Falha ao salvar o registro.");
    }
  };

  const handleNew = () => {
    setEditingAndar(undefined);
    setIsRegisterOpen(true);
  };

  const handleCancel = () => {
    setIsRegisterOpen(false);
    setEditingAndar(undefined);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cadastro de Andar</h1>
        <button onClick={handleNew} className="btn btn-primary">
          Novo Andar
        </button>
      </div>
      <CrudPage
        title="Cadastro de Andar"
        tableColumns={AndarColumns}
        tableData={andarData}
        register={
          isRegisterOpen ? (
            <AndarRegister
              dependencies={{ andarRepository }}
              initialData={editingAndar}
              onSubmit={handleSave}
              onCancel={handleCancel}
            />
          ) : undefined
        }
      />
    </div>
  );
}
