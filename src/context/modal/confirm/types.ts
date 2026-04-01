import { type ReactNode } from "react";

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

export type ConfirmDialogProviderProps = {
  children: ReactNode;
};

export type PendingConfirmState = {
  isOpen: boolean;
  options: Required<ConfirmDialogOptions>;
  resolver: ((result: boolean) => void) | null;
};
