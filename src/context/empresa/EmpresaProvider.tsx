import { useMemo, useState } from "react";
import { EmpresaContext, type EmpresaContextType } from "./EmpresaContext";
import {
  getSelectedEmpresaId,
  setSelectedEmpresaId,
} from "./empresaSelection";

interface EmpresaProviderProps {
  children: React.ReactNode;
}

export function EmpresaProvider({ children }: EmpresaProviderProps) {
  const [empresaId, setEmpresaIdState] = useState<string | null>(() =>
    getSelectedEmpresaId(),
  );

  const setEmpresaId = (value: string | null) => {
    setEmpresaIdState(value);
    setSelectedEmpresaId(value);
  };

  const value: EmpresaContextType = useMemo(
    () => ({ empresaId, setEmpresaId }),
    [empresaId],
  );

  return (
    <EmpresaContext.Provider value={value}>{children}</EmpresaContext.Provider>
  );
}
