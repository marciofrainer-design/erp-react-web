import type { LucideIcon } from "lucide-react";

export type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  width?: string | number;
  error?: string;
  Icon?: LucideIcon;
  onClickIcon?: (() => void) | undefined;
  isPassword?: boolean;
};
