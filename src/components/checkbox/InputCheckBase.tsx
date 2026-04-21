import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { InputCheckBaseProps } from "./types";

export const InputCheckBase = ({ value, onChange, label }: InputCheckBaseProps) => {
  return (
    <FieldGroup className="w-full">
      <div className="h-2"></div>
      <Field
        orientation="horizontal"
        className="w-full items-center gap-3 rounded-lg px-3 py-2 h-auto border border-input transition-colors focus-within:ring-2 focus-within:ring-primary/40"
        style={{
          borderColor: "var(--color-input-border)",
          backgroundColor: "var(--color-input-bg)",
        }}
      >
        <Checkbox
          className="size-7 border-2"
          checked={value === 1 || value === true}
          onCheckedChange={(checked) => onChange?.(checked === true ? 1 : 0)}
          aria-label={label ?? "Checkbox"}
        />
        <FieldLabel className="m-0 text-sm font-medium">{label}</FieldLabel>
      </Field>
    </FieldGroup>
  );
};

