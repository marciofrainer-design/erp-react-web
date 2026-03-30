import { Input } from "@components/ui/input";
import type { InputProps } from "./types";

const InputBase = ({
  ref,
  type,
  value,
  onChange,
  ariaInvalid,
  ariaDescribedBy,
  id,
  name,
  placeholder,
  Icon,
}: InputProps) => {
  return (
    <>
      <Input
        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg text-on-surface/80 font-mono text-sm px-4 py-3 outline-none h-12"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        aria-invalid={ariaInvalid || undefined}
        aria-describedby={ariaDescribedBy}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        ref={ref}
      />
      <div className="absolute inset-y-0 right-4 pl-4 flex items-center text-outline group-focus-within:text-primary transition-colors cursor-pointer">
        {Icon && <Icon className="w-5 h-5" />}
      </div>
    </>
  );
};

export default InputBase;
