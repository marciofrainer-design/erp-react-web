import { AndarPage } from "@/pages/andar/AndarPage";
import { ToolPlaceholder } from "./ToolPlaceholder";
import type { FormOption, ToolComponentParams } from "./types"
import { toolLabels } from "./consts";

export function formLabels(value: FormOption) {
  if (value === "andar") return "Andar";
  return "Empresa";
}

export function getToolComponent(
    params: ToolComponentParams
) {
  const { tool, andarDeps, selectedForm } = params;

  if (tool === "app45") {
    switch (selectedForm) {
      case "andar":
        return <AndarPage dependencies={andarDeps} />;
      default:
        return <AndarPage dependencies={andarDeps} />;
    }
  }

  return <ToolPlaceholder label={toolLabels[tool]} />;
}
