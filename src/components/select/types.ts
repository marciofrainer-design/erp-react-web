import type { LucideIcon } from "lucide-react";
import type React from "react";

export type SelectBaseProps = {
  label: string;
  Icon?: LucideIcon;
  error?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

