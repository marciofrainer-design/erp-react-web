import { Input } from "@components/ui/input";
import type { InputBaseProps } from "./types";

const InputBase = ({ type, value, onChange }: InputBaseProps) => {
  return (
    <Input
      className="w-full bg-surface-container-low border-none rounded-lg text-on-surface/50 font-mono text-sm px-4 py-3 outline-none"
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputBase;
