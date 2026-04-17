import type { InputProps } from "../types";

export type InputCheckBaseProps = Omit<InputProps, "value" | "onChange"> & {
  value?: number | boolean;
  onChange?: (value: number) => void;
};