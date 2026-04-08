import { FileText, Link, Monitor, Calendar, Settings } from "lucide-react";
import type { ToolKey } from "./types";
import { APP_FORM_OPTIONS } from "./treeSearch/";

export const formOptions = APP_FORM_OPTIONS;

export const toolLabels: Record<ToolKey, string> = {
  login: "Login",
  app45: "Aplicação 4.5",
  reservas: "Reservas Online",
  config: "Configurações do Usuário",
  relatorios: "Gerador de Relatório",
  integracoes: "Integrações",
};

export const toolIcons: Record<ToolKey, React.ComponentType<{ className?: string }>> = {
  login: Monitor,
  app45: Monitor,
  reservas: Calendar,
  config: Settings,
  relatorios: FileText,
  integracoes: Link,
};

