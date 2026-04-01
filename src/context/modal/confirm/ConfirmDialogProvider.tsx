import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import type {
  ConfirmDialogContextType,
  ConfirmDialogProviderProps,
  PendingConfirmState,
} from "./types";
import { defaultOptions } from "./consts";
import { ConfirmDialogContext } from "./confirmDialogContext";

export function ConfirmDialogProvider({
  children,
}: ConfirmDialogProviderProps) {
  const [state, setState] = useState<PendingConfirmState>({
    isOpen: false,
    options: defaultOptions,
    resolver: null,
  });

  const closeWithResult = useCallback((result: boolean) => {
    setState((previousState) => {
      previousState.resolver?.(result);

      return {
        ...previousState,
        isOpen: false,
        resolver: null,
      };
    });
  }, []);

  const confirm = useCallback<ConfirmDialogContextType["confirm"]>(
    (options = {}) => {
      return new Promise<boolean>((resolve) => {
        setState({
          isOpen: true,
          options: {
            ...defaultOptions,
            ...options,
          },
          resolver: resolve,
        });
      });
    },
    [],
  );

  const contextValue = useMemo<ConfirmDialogContextType>(
    () => ({
      confirm,
    }),
    [confirm],
  );

  return (
    <ConfirmDialogContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {state.isOpen ? (
          <motion.div
            key="confirm-dialog"
            className="fixed inset-0 z-120 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-foreground/35 backdrop-blur-[2px]"
              onClick={() => closeWithResult(false)}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-dialog-title"
              aria-describedby="confirm-dialog-description"
              className="relative w-full max-w-md rounded-2xl border border-border/70 bg-card p-6 shadow-2xl"
              initial={{ scale: 0.94, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 rounded-t-2xl bg-linear-to-b from-primary/12 via-primary/6 to-transparent" />

              <div className="relative space-y-5">
                <div className="space-y-2">
                  <h2
                    id="confirm-dialog-title"
                    className="text-lg font-semibold text-foreground"
                  >
                    {state.options.title}
                  </h2>
                  <p
                    id="confirm-dialog-description"
                    className="text-sm text-muted-foreground"
                  >
                    {state.options.description}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => closeWithResult(false)}
                  >
                    {state.options.cancelText}
                  </Button>
                  <Button
                    variant={
                      state.options.variant === "destructive"
                        ? "destructive"
                        : "default"
                    }
                    onClick={() => closeWithResult(true)}
                  >
                    {state.options.confirmText}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ConfirmDialogContext.Provider>
  );
}
