import { Label } from "@components/ui/label";
import type { InputProps } from "../types";
import InputBase from "@components/inputs/InputBase";
import { InputGroupBase } from "../group/InputGroupBase";
import {useEffect, useState} from "react";
import { SpanError } from "../SpanError";

const InputStringBase = ({
  label,
  value,
  width,
  Icon,
  onClickIcon,
  isPassword = false,
  ...props
}: InputProps) => {
  const [height, setHeight] = useState<string | number>("auto");
  const heightError = "12";

  useEffect(() => {
    if (props.error) {
      setHeight(heightError);
    } else {
      setHeight("auto");
    }
  }, [props.error]);
  
  return (
    <InputGroupBase width={width} height={height}>
      <Label className="pl-5 w-full text-sm font-semibold text-on-surface-variant mb-2 border-none">
        {label}
      </Label>
      <InputBase
        {...props}
        value={value}
        Icon={Icon}
        onClickIcon={onClickIcon}
        type={isPassword ? "password" : "text"}
      />
      {props.error ? (
        <SpanError error={props.error}/>
      ) : null}
    </InputGroupBase>
  );
};

export { InputStringBase };
