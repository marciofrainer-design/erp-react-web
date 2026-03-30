import type { AndarDependencies } from "@/domain/andar/types";
import { formOptions } from "./consts";

export type ToolKey = "app45" | "reservas" | "config" | "relatorios" | "integracoes";

export type FormOption = (typeof formOptions)[number];

export type ToolComponentParams = {
  tool: ToolKey;
  andarDeps: AndarDependencies;
  selectedForm: FormOption;
};

export type ToolFormSelectProps = {
  selectedForm: FormOption;
  onSelectForm: (value: FormOption) => void;
};