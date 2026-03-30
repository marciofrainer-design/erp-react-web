import { Label } from "@components/ui/label";
import type { InputProps } from "../types";
import { InputGroupBase } from "../group/InputGroupBase";
import InputBase from "@components/inputs/InputBase";

const InputStringBase = ({
  label,
  value,
  onChange,
  width,
  error,
}: InputProps) => {
  return (
    <InputGroupBase width={width}>
      <Label className="pl-4 w-full block text text-sm font-semibold text-on-surface-variant mb-2">
        {label}        
      </Label>
      <InputBase
        type="text"
        value={value}
        aria-invalid={Boolean(error) || undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? (
        <span className="mt-1 block text-xs text-destructive">{error}</span>
      ) : null}
    </InputGroupBase>
  );
};

export { InputStringBase };
