import type { LucideIcon } from "lucide-react";

export type ButtonBaseProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  Icon?: LucideIcon;
  label?: string;
  hidden?: boolean;
  className?: string;
};

export type ButtonSearchBaseProps = {
  disabled?: boolean;
  onClick?: () => void;
};
