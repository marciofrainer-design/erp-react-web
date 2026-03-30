import { Label } from "@components/ui/label";
import type { InputProps } from "../types";
import InputBase from "@components/inputs/InputBase";
import { useId } from "react";

const InputStringBase = ({
  id,
  name,
  label,
  value,
  onChange,
  width,
  ref,
  error,
  placeholder,
  Icon
}: InputProps) => {
  const errorId = useId();

  return (
    <div
      className="flex flex-col gap-1 w-full max-w-full pb-3 items-start"
      style={width ? { maxWidth: width } : undefined}
    >
      <Label className="pl-1 w-full text-sm font-semibold text-on-surface-variant mb-1 border-none">
        {label}
      </Label>
      <InputBase
        id={id}
        name={name}
        type="text"
        value={value}
        ariaInvalid={Boolean(error)}
        ariaDescribedBy={error ? error : undefined}
        onChange={onChange}
        ref={ref}
        placeholder={placeholder}
        Icon={Icon}
      />
      {error ? (
        <span id={errorId} className="mt-1 block text-xs text-destructive">
          {error}
        </span>
      ) : null}
    </div>
  );
};

export { InputStringBase };
