import { useState, useCallback, useEffect } from "react";
import type { FooterMessage, FooterMessageType } from "./types";

const AUTO_DISMISS_MS = 5000;

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
