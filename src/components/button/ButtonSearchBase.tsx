import { Settings2 } from "lucide-react";
import type { ButtonSearchBaseProps } from "./types";
import { ButtonBase } from "./ButtonBase";

const ButtonSearchBase = ({ onClick, disabled }: ButtonSearchBaseProps) => {
  return (
    <ButtonBase
      label="Pesquisar"
      onClick={onClick}
      disabled={disabled}
    >
      <Settings2 className="w-5 h-5" />
      Pesquisar
    </ButtonBase>
  );
};

export default ButtonSearchBase;
