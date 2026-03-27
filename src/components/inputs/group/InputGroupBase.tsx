import { InputGroup } from "@/components/ui/input-group";
import type { InputGroupBaseProps } from "./types";

const InputGroupBase = ({
  children,
  width,
}: InputGroupBaseProps) => {
  return (
    <InputGroup
      className="gap-2 flex flex-col"
      style={{ width: width || "100%" }}
    >
      {children}
    </InputGroup>
  );
};

export { InputGroupBase };
