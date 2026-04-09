import type { UHTipo } from "@/domain/uhTipo/types";

export const UH_TIPO_MAPPER = {
  valueKey: "iduhtipo" as keyof UHTipo,
  labelKeys: ["nmuhtipo", "cduhtipo"] as (keyof UHTipo)[],
  triggerLabelKey: "nmuhtipo" as keyof UHTipo,
};