import type { LucideIcon } from "lucide-react";

export type InputProps = {
  type?: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
  width?: string;
  error?: string;
  onChange?: (value: string) => void;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  Icon?: LucideIcon;
};
