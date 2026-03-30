import { InputGroup } from "@/components/ui/input-group";
import type { InputGroupBaseProps } from "./types";

const InputGroupBase = ({
  children,
  width,
}: InputGroupBaseProps) => {
  return (
    <InputGroup
      className="flex flex-col gap-1 w-full max-w-full pb-3 items-start"
      style={width ? { maxWidth: width } : undefined}
    >
      {children}
    </InputGroup>
  );
};

export { InputGroupBase };
