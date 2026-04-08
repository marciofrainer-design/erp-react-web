import { useMemo, useState } from "react";
import type { EmpresaContextType, EmpresaProviderProps } from "./types";
import {
  getSelectedEmpresaId,
  setSelectedEmpresaId,
} from "./empresaSelection";
import { EmpresaContext } from "./EmpresaContext";

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
