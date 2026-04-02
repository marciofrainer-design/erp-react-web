import { Settings2 } from "lucide-react";
import type { ButtonSearchBaseProps } from "./types";
import { ButtonBase } from "./ButtonBase";
import { useAppTranslation } from "@/i18n/useAppTranslation";

const ButtonSearchBase = ({ onClick, disabled }: ButtonSearchBaseProps) => {
  const { t } = useAppTranslation("components");

  return (
    <ButtonBase
      label={t("buttons.search")}
      onClick={onClick}
      disabled={disabled}
    >
      <Settings2 className="w-5 h-5" />
      {t("buttons.search")}
    </ButtonBase>
  );
};

export default ButtonSearchBase;
