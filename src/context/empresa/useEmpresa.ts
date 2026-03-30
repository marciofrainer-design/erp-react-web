import { useContext } from "react";
import { EmpresaContext, type EmpresaContextType } from "./EmpresaContext";

export function useEmpresa(): EmpresaContextType {
  const context = useContext(EmpresaContext);

  if (!context) {
    throw new Error("useEmpresa must be used within an EmpresaProvider");
  }

  return context;
}
