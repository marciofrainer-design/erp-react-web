export interface EmpresaContextType {
  empresaId: string | null;
  setEmpresaId: (empresaId: string | null) => void;
}

export interface EmpresaProviderProps {
  children: React.ReactNode;
}