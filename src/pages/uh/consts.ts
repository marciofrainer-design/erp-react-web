
import type { UHTipo } from "@/domain/uhTipo/types";
import type { Caracteristica } from "@/domain/caracteristica/types";

export const UH_TIPO_MAPPER = {
  valueKey: "iduhtipo" as keyof UHTipo,
  labelKeys: ["nmuhtipo", "cduhtipo"] as (keyof UHTipo)[],
  triggerLabelKey: "nmuhtipo" as keyof UHTipo,
};

export const CARACTERISTICA_MAPPER = {
  valueKey: "idcaracteristica" as keyof Caracteristica,
  labelKeys: ["dscaracteristica", "dsabreviatura"] as (keyof Caracteristica)[],
  triggerLabelKey: "dscaracteristica" as keyof Caracteristica,
};