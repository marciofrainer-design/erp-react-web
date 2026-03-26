import { type AndarDependencies } from "@/domain/andar/AndarDependenciesFactory";
import { FileText, Link, Monitor, Calendar, Settings } from "lucide-react";
import { AndarPage } from "@/pages/andar/AndarPage";
import { EmpresaPage } from "@/pages/empresa/EmpresaPage";
import { ToolPlaceholder } from "./ToolPlaceholder";
import type { EmpresaDependencies } from "@/domain/empresa/EmpresaDependenciesFactory";

export type ToolKey = "app45" | "reservas" | "config" | "relatorios" | "integracoes";

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

export const formOptions = ["andar", "empresa"] as const;

export type FormOption = (typeof formOptions)[number];

export function formLabels(value: FormOption) {
  if (value === "andar") return "Andar";
  return "Empresa";
}

type GetToolComponentParams = {
  tool: ToolKey;
  andarDeps: AndarDependencies;
  empresaDeps: EmpresaDependencies;
  selectedForm: FormOption;
};
export function getToolComponent(
    params: GetToolComponentParams
) {
  const { tool, andarDeps, empresaDeps, selectedForm } = params;

  if (tool === "app45") {
    switch (selectedForm) {
      case "andar":
        return <AndarPage dependencies={andarDeps} />;
      case "empresa":
        return <EmpresaPage dependencies={empresaDeps}/>;
      default:
        return <AndarPage dependencies={andarDeps} />;
    }
  }

  return <ToolPlaceholder label={toolLabels[tool]} />;
}
