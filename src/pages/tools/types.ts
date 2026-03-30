import { formOptions } from "./consts";

export type ToolKey = "app45" | "reservas" | "config" | "relatorios" | "integracoes";

export type FormOption = (typeof formOptions)[number];

export type ToolComponentParams = {
  tool: ToolKey;
  selectedForm: FormOption;
};

export type ToolFormSelectProps = {
  selectedForm: FormOption;
  onSelectForm: (value: FormOption) => void;
};