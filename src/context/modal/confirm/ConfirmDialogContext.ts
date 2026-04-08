import { createContext } from "react";
import type { ConfirmDialogContextType} from "./types";

export const ConfirmDialogContext =
  createContext<ConfirmDialogContextType | null>(null);
