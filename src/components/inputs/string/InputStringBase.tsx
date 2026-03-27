import { Input } from "@/components/ui/input";
import { Label } from "../../ui/label";
import type { InputProps } from "../types";
import { InputGroupBase } from "../group/InputGroupBase";

const InputStringBase = ({ label, value, onChange, width }: InputProps) => {
  return (
    <InputGroupBase width={width}>
      <Label className="block text-sm font-semibold text-on-surface-variant mb-2">
        {label}
      </Label>
      <Input
        className="w-full bg-surface-container-low border-none rounded-lg text-on-surface/50 font-mono text-sm px-4 py-3 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroupBase>
  );
};

export { InputStringBase };
