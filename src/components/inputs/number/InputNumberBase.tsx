import { Label } from "../../ui/label";
import type { InputProps } from "../../types";
import { InputGroupBase } from "../group/InputGroupBase";
import InputBase from "@/components/inputs/InputBase";
import { SpanError } from "../SpanError";

const InputNumberBase = ({
  label,
  value,
  onChange,
  width,
  ...props
}: InputProps) => {
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
      <InputBase
        {...props}
        label={label}
        type="number"
        value={value}
        onChange={onChange}
      />
      {props.error ? (
        <SpanError error={props.error}/>
      ) : null}
    </InputGroupBase>
  );
};

export { InputNumberBase };
