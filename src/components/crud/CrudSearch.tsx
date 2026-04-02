import ButtonSearchBase from "../button/ButtonSearchBase";
import { InputStringBase } from "../inputs/string/InputStringBase";
import { Trash2 } from "lucide-react";
import { useAppTranslation } from "@/i18n/useAppTranslation";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
};

export function CrudSearch({ value, onChange, onSearch, onClear }: Props) {
  const { t } = useAppTranslation("crud");
  return (
    <div className="flex w-full gap-2 items-center">
      <div className="relative w-full">
        <InputStringBase
          placeholder={t("actions.searchPlaceholder")}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
            if (e.key === "Escape") {
              onClear();
            }
          }}
          Icon={value ? Trash2 : undefined}
        />
      </div>
      <ButtonSearchBase onClick={onSearch} />
    </div>
  );
}
