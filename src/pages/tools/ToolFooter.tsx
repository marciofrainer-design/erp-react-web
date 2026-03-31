import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import type { FooterMessage, FooterMessageType, ToolFooterProps } from "./types";

const MESSAGE_ICONS: Record<FooterMessageType, React.ReactNode> = {
  info: <Info className="w-3.5 h-3.5 shrink-0 text-blue-400" />,
  success: <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-green-400" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-yellow-400" />,
  error: <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />,
};

function MessageChip({
  message,
  onDismiss,
}: {
  message: FooterMessage;
  onDismiss: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      key={message.id}
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs shrink-0 max-w-xs"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      {MESSAGE_ICONS[message.type]}
      <span
        className="truncate"
        style={{ color: "var(--color-text-primary)" }}
        title={message.text}
      >
        {message.text}
      </span>
      <button
        onClick={() => onDismiss(message.id)}
        className="ml-0.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
        aria-label="Dispensar notificação"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

const MAX_VISIBLE = 4;

const ToolFooter = ({ messages, isConnected, onDismiss }: ToolFooterProps) => {
  const visible = messages.slice(-MAX_VISIBLE);

  return (
    <footer
      className="glass border-t border-outline-variant/10"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        color: "var(--color-text-secondary)",
      }}
    >
      <div className="flex items-center gap-3 px-6 h-9 max-w-480 mx-auto">
        {/* Connection status */}
        <div className="flex items-center gap-1.5 shrink-0">
          <motion.div
            animate={{ scale: isConnected ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.4 }}
          >
            {isConnected ? (
              <Wifi className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-red-400" />
            )}
          </motion.div>
          <span className="text-xs">
            {isConnected ? "Conectado" : "Sem conexão"}
          </span>
        </div>

        <div
          className="h-4 w-px shrink-0"
          style={{ backgroundColor: "var(--color-border-secondary)" }}
        />

        <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.length > 0 ? (
              visible.map((msg) => (
                <MessageChip key={msg.id} message={msg} onDismiss={onDismiss} />
              ))
            ) : (
              <motion.span
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs"
                style={{ opacity: 0.35 }}
              >
                Nenhuma notificação
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
};

export default ToolFooter;
