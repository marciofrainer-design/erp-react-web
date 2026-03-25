import { EmpresaColumns, type Empresa } from '@/domain/empresa/types';
import { CrudPage } from '@/shared/ui/crud/CrudPage';
import { EmpresaDependenciesFactory, type EmpresaDependencies } from '@/domain/empresa/EmpresaDependenciesFactory';
import { useEffect, useState } from 'react';

interface EmpresaPageProps {
  dependencies?: EmpresaDependencies;
}

export function EmpresaPage({ dependencies }: EmpresaPageProps = {}) {
  const { empresaRepository } = dependencies ?? EmpresaDependenciesFactory.create();

  const [empresaData, setEmpresaData] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpresaData = async () => {
      try {
        setLoading(true);
        const data = await empresaRepository.getAll();
        setEmpresaData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Erro ao buscar dados de Empresa:', err);
        setError('Erro ao carregar dados de Empresa');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, [empresaRepository]);

  if (loading) {
    return <div>Carregando empresas...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <CrudPage
      title="Cadastro de Empresa"
      tableColumns={EmpresaColumns}
      tableData={empresaData}
    />
  );
}
