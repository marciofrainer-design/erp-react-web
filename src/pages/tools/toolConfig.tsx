import { AndarPage } from "@/pages/andar/AndarPage";
import { UhPage } from "@/pages/uh/UhPage";
import { ToolPlaceholder } from "./ToolPlaceholder";
import type { FormOption, ToolComponentParams } from "./types";
import { toolLabels } from "./consts";

export function formLabels(value: FormOption) {
  if (value === "floor") return "Andar";
  if (value === "uh") return "UH";
  if (value === "edificacao") return "Edificação";
  if (value === "uhclassificacao") return "Classificação UH";
  return "Empresa";
}

export function getToolComponent(
  params: ToolComponentParams,
) {
  const { tool, selectedForm, onCrudModeChange } = params;

  if (tool === "app45") {
    switch (selectedForm) {
      case "floor":
        return <AndarPage onModeChange={onCrudModeChange} />;
      case "uh":
        return <UhPage onModeChange={onCrudModeChange} />;
      default:
        return <ToolPlaceholder label={toolLabels[tool]} />;
    }
  }

  return <ToolPlaceholder label={toolLabels[tool]} />;
}
