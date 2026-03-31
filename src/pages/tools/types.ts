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
  showTitle?: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

export type FooterMessageType = "info" | "success" | "warning" | "error";

export type FooterMessage = {
  id: string;
  type: FooterMessageType;
  text: string;
  timestamp: Date;
  autoDismiss?: boolean;
};

export type ToolFooterProps = {
  messages: FooterMessage[];
  isConnected: boolean;
  onDismiss: (id: string) => void;
};
