import { createContext } from "react";

export type ConfirmDialogVariant = "default" | "destructive";

export type ConfirmDialogOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmDialogVariant;
};

export type ConfirmDialogContextType = {
  confirm: (options?: ConfirmDialogOptions) => Promise<boolean>;
};

export const ConfirmDialogContext =
  createContext<ConfirmDialogContextType | null>(null);
