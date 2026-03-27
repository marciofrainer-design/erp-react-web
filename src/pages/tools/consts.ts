import { FileText, Link, Monitor, Calendar, Settings } from "lucide-react";
import type { ToolKey } from "./types";

export const formOptions = ["andar"] as const;
export const toolLabels: Record<ToolKey, string> = {
  app45: "Aplicação 4.5",
  reservas: "Reservas Online",
  config: "Configurações do Usuário",
  relatorios: "Gerador de Relatório",
  integracoes: "Integrações",
};

export const toolIcons: Record<ToolKey, React.ComponentType<{ className?: string }>> = {
  app45: Monitor,
  reservas: Calendar,
  config: Settings,
  relatorios: FileText,
  integracoes: Link,
};
