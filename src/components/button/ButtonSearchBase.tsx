import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ButtonSearchBaseProps } from "./types";

const ButtonSearchBase = ({ onClick, disabled }: ButtonSearchBaseProps) => {
  return (
    <Button
      className="flex items-center gap-2 px-5 py-3 bg-surface-container-high text-on-surface font-semibold text-lg rounded-xl hover:bg-surface-container-highest transition-all cursor-pointer active:scale-95"
      onClick={onClick}
      disabled={disabled}
    >
      <Settings2 className="w-5 h-5" />
      Pesquisar
    </Button>
  );
};

export default ButtonSearchBase;
