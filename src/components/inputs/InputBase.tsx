import { Input } from "@components/ui/input";
import type { InputProps } from "./types";

const InputBase = ({
  ref,
  type,
  value,
  onChange,
  ariaInvalid,
  ariaDescribedBy,
}: InputProps) => {
  return (
    <Input
      className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg text-on-surface/80 font-mono text-sm px-4 py-3 outline-none"
      type={type}
      value={value}
      aria-invalid={ariaInvalid || undefined}
      aria-describedby={ariaDescribedBy}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      ref={ref}
    />
  );
};

export default InputBase;
