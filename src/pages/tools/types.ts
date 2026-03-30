import { formOptions } from "./consts";

export type ToolKey = "login" | "app45" | "reservas" | "config" | "relatorios" | "integracoes";

export type FormOption = (typeof formOptions)[number];

export type ToolComponentParams = {
  tool: ToolKey;
  selectedForm: FormOption;
};

export type ToolFormSelectProps = {
  selectedForm: FormOption;
  onSelectForm: (value: FormOption) => void;
};

export type ToolHeaderProps = {
  title: string;
  setIsMenuOpen: (open: boolean) => void;
};
