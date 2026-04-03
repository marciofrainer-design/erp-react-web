import { createContext } from "react";
import type { EmpresaContextType } from "./types";

export const EmpresaContext = createContext<EmpresaContextType | undefined>(
  undefined,
);

