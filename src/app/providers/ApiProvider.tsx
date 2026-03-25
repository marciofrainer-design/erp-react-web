import { createContext, useContext, type ReactNode } from 'react';
import { DataSnapAdapter } from '@/infra/api/service';
import { AndarRepository } from '@/domain/andar/AndarRepository';

// Interface para o contexto de dependências
interface ApiDependencies {
  andarRepository: AndarRepository;
}

// Criação do contexto
const ApiContext = createContext<ApiDependencies | null>(null);

// Hook personalizado para usar o contexto
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi deve ser usado dentro de um ApiProvider');
  }
  return context;
};

// Props do provider
interface ApiProviderProps {
  children: ReactNode;
}

// Provider que configura as dependências
export function ApiProvider({ children }: ApiProviderProps) {
  // Instancia as dependências uma vez
  const apiAdapter = new DataSnapAdapter();
  const andarRepository = new AndarRepository(apiAdapter);

  const dependencies: ApiDependencies = {
    andarRepository,
  };

  return (
    <ApiContext.Provider value={dependencies}>
      {children}
    </ApiContext.Provider>
  );
}