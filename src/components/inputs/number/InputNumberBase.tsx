import { Input } from "@/components/ui/input";
import { Label } from "../../ui/label";
import type { InputProps } from "../types";
import { InputGroupBase } from "../group/InputGroupBase";

const InputNumberBase = ({ label, value, onChange, width }: InputProps) => {
  return (
    <InputGroupBase width={width}>
      <Label
        htmlFor="andar"
        className="block text-sm font-medium"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
        }}
      >
        {label}
      </Label>
      <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
    </InputGroupBase>
  );
};

export { InputNumberBase };
