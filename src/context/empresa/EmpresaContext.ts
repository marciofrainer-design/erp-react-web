import { createContext } from "react";

export interface EmpresaContextType {
  empresaId: string | null;
  setEmpresaId: (empresaId: string | null) => void;
}

export const EmpresaContext = createContext<EmpresaContextType | undefined>(
  undefined,
);
