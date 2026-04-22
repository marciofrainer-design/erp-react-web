import { AndarPage } from "@/pages/andar/AndarPage";
import { UhPage } from "@/pages/uh/UhPage";
import { HospedesPage } from "@/pages/hospedes/HospedesPage";
import { ReservasPage } from "@/pages/reservas/ReservasPage";
import { CheckinPage } from "@/pages/checkin_checkout/CheckinPage";
import { ToolPlaceholder } from "./ToolPlaceholder";
import type { FormOption, ToolComponentParams } from "./types";
import { toolLabels } from "./consts";

export function formLabels(value: FormOption) {
  if (value === "floor") return "Andar";
  if (value === "uh") return "UH";
  if (value === "edificacao") return "Edificação";
  if (value === "uhclassificacao") return "Classificação UH";
  if (value === "hospedes") return "Hóspedes";
  if (value === "reservas") return "Reservas";
  if (value === "checkin") return "Check-in / Check-out";
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
      case "hospedes":
        return <HospedesPage onModeChange={onCrudModeChange} />;
      case "reservas":
        return <ReservasPage onModeChange={onCrudModeChange} />;
      case "checkin":
        return <CheckinPage onModeChange={onCrudModeChange} />;
      default:
        return <ToolPlaceholder label={toolLabels[tool]} />;
    }
  }

  return <ToolPlaceholder label={toolLabels[tool]} />;
}
