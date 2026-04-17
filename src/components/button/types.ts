import type { LucideIcon } from "lucide-react";

export type ButtonBaseProps = React.ComponentProps<"button"> & {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  Icon?: LucideIcon;
  label?: string;
  hidden?: boolean;
};

export type ButtonSearchBaseProps = {
  disabled?: boolean;
  onClick?: () => void;
};
