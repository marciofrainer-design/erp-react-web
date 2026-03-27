import { InputGroup } from "@/components/ui/input-group";
import type { InputGroupBaseProps } from "./types";

const InputGroupBase = ({
  children,
  width,
}: InputGroupBaseProps) => {
  return (
    <InputGroup
      className="md:col-span-3"
      style={{ width: width || "100%" }}
    >
      {children}
    </InputGroup>
  );
};

export { InputGroupBase };
