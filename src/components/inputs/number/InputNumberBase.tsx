import { Label } from "../../ui/label";
import type { InputProps } from "../types";
import { InputGroupBase } from "../group/InputGroupBase";
import InputBase from "@/components/inputs/InputBase";

const InputNumberBase = ({ label, value, onChange, width }: InputProps) => {
  return (
    <InputGroupBase width={width}>
      <Label
        className="block text-sm font-semibold text-on-surface-variant mb-2"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
        }}
      >
        {label}
      </Label>
      <InputBase type="number" value={value} onChange={(e) => onChange(e.target.value)} />
    </InputGroupBase>
  );
};

export { InputNumberBase };
