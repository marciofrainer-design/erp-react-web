import type { SelectBaseProps } from "./types";
import { Select, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";

const SelectBase = ({
  label,
  options,
  onChange,
  Icon,
}: SelectBaseProps) => {
    const [value, setValue] = useState<string>("");
    const selectedLabel = options.find((option) => option.value === value)?.label;

    useEffect(() => {
      onChange(value);
     }, [value, onChange]);
    
  return (
    <div className="flex items-center gap-4 mt-4 ml-8">
      <div className="flex flex-col">
        <label className="text-[10px] uppercase font-bold text-outline tracking-wider mb-2 ml-2 px-1">
          {label}
        </label>
        <div className="flex items-center bg-surface-container-lowest shadow-sm rounded-xl px-4 py-2 gap-3 min-w-70 cursor-pointer hover:bg-surface-container transition-colors border border-outline-variant/20">
          {Icon && <Icon className="text-primary w-5 h-5" />}
          <Select value={value} onValueChange={(value) => setValue(value || "")}>
            <SelectTrigger>
              <SelectValue placeholder={`Selecione ${label.toLowerCase()}`} >
                {selectedLabel}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options &&
                  options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SelectBase;
