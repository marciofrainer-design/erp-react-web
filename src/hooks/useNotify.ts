import { toast } from "sonner";
import type { ExternalToast } from "sonner";
import { useMemo } from "react";

export function useNotify() {
  return useMemo(
    () => ({
      success: (message: string, options?: ExternalToast) =>
        toast.success(message, options),
      error: (message: string, options?: ExternalToast) =>
        toast.error(message, options),
      warning: (message: string, options?: ExternalToast) =>
        toast.warning(message, options),
      info: (message: string, options?: ExternalToast) =>
        toast.info(message, options),
      message: (message: string, options?: ExternalToast) =>
        toast(message, options),
      loading: (message: string, options?: ExternalToast) =>
        toast.loading(message, options),
      dismiss: (toastId?: string | number) => toast.dismiss(toastId),
    }),
    [],
  );
}
