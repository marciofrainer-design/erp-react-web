import { Input } from "@/components/ui/input";
import { Label } from "../../ui/label";
import type { InputProps } from "../types";
import { InputGroupBase } from "../group/InputGroupBase";

const InputStringBase = ({ label, value, onChange, width }: InputProps) => {
  return (
    <InputGroupBase width={width}>
      <Label className="text-left text-sm font-medium">
        {label}
      </Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </InputGroupBase>
  );
};

export { InputStringBase };
