import { useContext } from "react";
import { ConfirmDialogContext } from "./confirmDialogContext";

export function useConfirm() {
  const context = useContext(ConfirmDialogContext);

  if (!context) {
    throw new Error("useConfirm must be used within ConfirmDialogProvider");
  }

  return context.confirm;
}
