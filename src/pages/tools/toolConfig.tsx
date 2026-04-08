import { AndarPage } from "@/pages/andar/AndarPage";
import { ToolPlaceholder } from "./ToolPlaceholder";
import type { FormOption, ToolComponentParams } from "./types";
import { toolLabels } from "./consts";

export function formLabels(value: FormOption) {
  if (value === "floor") return "Andar";
  return "Empresa";
}

export function getToolComponent(
  params: ToolComponentParams,
) {
  const { tool, selectedForm } = params;

  if (tool === "app45") {
    switch (selectedForm) {
      case "floor":
        return <AndarPage />;
      default:
        return <ToolPlaceholder label={toolLabels[tool]} />;
    }
  }

  return <ToolPlaceholder label={toolLabels[tool]} />;
}
