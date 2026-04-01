import type { ConfirmDialogOptions } from "./types";

export const defaultOptions: Required<ConfirmDialogOptions> = {
  title: "Confirmar operação",
  description: "Deseja realmente continuar com esta ação?",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  variant: "default",
};

