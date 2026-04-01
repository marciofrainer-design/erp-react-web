import { ButtonBase } from "../button/ButtonBase";
import {
  CircleX,
  Printer,
  Trash2,
  Copy,
  CirclePlus,
  Eye,
  Info,
} from "lucide-react";
import type { CrudToolbarProps } from "./types";
import { useAppTranslation } from "@/i18n/useAppTranslation";

export function CrudToolbar({
  onView,
  onNew,
  onClone,
  onDelete,
  onPrint,
  onClose,
  onCancel,
  onSave,
  hasSelected,
  showTable = true,
  isFormValid = true,
}: CrudToolbarProps) {
  const { t } = useAppTranslation("crud");
  
  return (
    <footer className="w-full bg-surface-container-lowest px-8 py-4 flex items-center justify-between shadow-[0_-4px_20px_rgba(27,27,36,0.03)] z-50">
      <div className="flex items-center gap-3">
        {showTable ? (
          <>
            <ButtonBase onClick={onNew} Icon={CirclePlus} label={t("new")} />
            <ButtonBase
              onClick={onView}
              disabled={!hasSelected}
              Icon={Eye}
              label={t("view")} 
            />
            <ButtonBase
              onClick={onClone}
              disabled={!hasSelected}
              Icon={Copy}
              label={t("clone")}
            />
            <ButtonBase
              onClick={onDelete}
              disabled={!hasSelected}
              Icon={Trash2}
              label={t("delete")}
            />
          </>
        ) : (
          <div className="flex items-center gap-4 text-sm text-on-surface-variant">
            <Info className={`w-5 h-5 ${isFormValid ? "text-primary" : "text-destructive"}`} />
            <span className="font-medium">
              {isFormValid
                ? t("formValid")
                : t("formInvalid")}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        {showTable ? (
          <>
            <ButtonBase onClick={onPrint} Icon={Printer} label={t("print")} />
            <ButtonBase onClick={onClose} Icon={CircleX} label={t("close")} hidden/>
          </>
        ) : (
          <>
            <ButtonBase onClick={onCancel} Icon={CircleX} label={t("cancel")} />
            <ButtonBase
              onClick={onSave}
              disabled={!isFormValid}
              Icon={CirclePlus}
              label={t("save")}
            />
          </>
        )}
      </div>
    </footer>
  );
}
