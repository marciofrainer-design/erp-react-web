import { createContext } from "react";
import { type ConfirmDialogContextType, type ConfirmDialogOptions } from "./types";

export const ConfirmDialogContext =
  createContext<ConfirmDialogContextType | null>(null);

export const defaultOptions: Required<ConfirmDialogOptions> = {
    title: "Confirmar operação",
    description: "Deseja realmente continuar com esta ação?",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    variant: "default",
  };