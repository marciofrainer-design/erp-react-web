import { useState, useCallback, useEffect } from "react";
import type { FooterMessage, FooterMessageType } from "./types";

const AUTO_DISMISS_MS = 5000;
const DATASNAP_ERROR_EVENT = "datasnap:error-message";
const SHOW_DATASNAP_MESSAGE_IN_FOOTER =
  import.meta.env.DEV &&
  import.meta.env.VITE_SHOW_DATASNAP_MESSAGE_IN_TOOL_FOOTER === "true";

type DataSnapErrorEventDetail = {
  message?: unknown;
};

export function useFooterMessages() {
  const [messages, setMessages] = useState<FooterMessage[]>([]);
  const [isConnected, setIsConnected] = useState(navigator.onLine);

  const dismiss = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const addMessage = useCallback(
    (type: FooterMessageType, text: string, autoDismiss = true): string => {
      const id = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { id, type, text, timestamp: new Date(), autoDismiss },
      ]);
      if (autoDismiss) {
        setTimeout(() => {
          setMessages((prev) => prev.filter((m) => m.id !== id));
        }, AUTO_DISMISS_MS);
      }
      return id;
    },
    [],
  );

  useEffect(() => {
    if (!SHOW_DATASNAP_MESSAGE_IN_FOOTER) {
      return;
    }

    const handleDataSnapError = (event: Event) => {
      const customEvent = event as CustomEvent<DataSnapErrorEventDetail>;
      const rawMessage = customEvent.detail?.message;

      if (typeof rawMessage !== "string" || rawMessage.trim().length === 0) {
        return;
      }

      addMessage("error", rawMessage, true);
    };

    window.addEventListener(
      DATASNAP_ERROR_EVENT,
      handleDataSnapError as EventListener,
    );

    return () => {
      window.removeEventListener(
        DATASNAP_ERROR_EVENT,
        handleDataSnapError as EventListener,
      );
    };
  }, [addMessage]);

  useEffect(() => {
    const handleOnline = () => {
      setIsConnected(true);
      // Remove any persistent offline message and add reconnection notice
      setMessages((prev) => prev.filter((m) => m.type !== "error" || m.autoDismiss !== false));
      addMessage("success", "Conexão com o servidor restabelecida.");
    };

    const handleOffline = () => {
      setIsConnected(false);
      addMessage("error", "Conexão com o servidor perdida.", false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [addMessage]);

  return { messages, isConnected, addMessage, dismiss };
}
