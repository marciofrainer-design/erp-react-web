import type { LucideIcon } from "lucide-react";

export type SelectBaseProps = {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  Icon?: LucideIcon;
};

