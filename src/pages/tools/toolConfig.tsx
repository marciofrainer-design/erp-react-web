import { AndarPage } from "@/pages/andar/AndarPage";
import { UhPage } from "@/pages/uh/UhPage";
import { ToolPlaceholder } from "./ToolPlaceholder";
import type { FormOption, ToolComponentParams } from "./types";
import { toolLabels } from "./consts";

export function formLabels(value: FormOption) {
  if (value === "floor") return "Andar";
  if (value === "uh") return "UH";
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
      case "uh":
        return <UhPage />;
      default:
        return <ToolPlaceholder label={toolLabels[tool]} />;
    }
  }

  return <ToolPlaceholder label={toolLabels[tool]} />;
}
