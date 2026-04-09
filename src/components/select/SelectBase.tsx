import { cn } from "@/lib/utils";
import { Select } from "../ui/select";
import { SpanError } from "@/components/inputs/SpanError";
import type { SelectBaseProps } from "./types";

const SelectBase = ({ label, Icon, error, className, children, disabled, onValueChange, ...selectProps }: SelectBaseProps) => {
  const handleValueChange = onValueChange
    ? (value: string | null) => onValueChange(value ?? "")
    : undefined;

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <label className="text-[10px] uppercase font-bold text-outline tracking-wider mb-1 ml-3 px-1">
        {label}
      </label>
      <div
        className={cn(
          "flex items-center bg-surface-container-lowest shadow-sm rounded-xl px-4 py-2 gap-3 min-w-56 border border-outline-variant/20 transition-colors focus-within:ring-2 focus-within:ring-primary/40",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-surface-container",
          error && "border-destructive",
        )}
      >
        {Icon && <Icon className="text-primary w-5 h-5 shrink-0" />}
        <Select disabled={disabled} onValueChange={handleValueChange} {...selectProps}>
          {children}
        </Select>
      </div>
      {error && <SpanError error={error} />}
    </div>
  );
};

export default SelectBase;
