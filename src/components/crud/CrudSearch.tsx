import ButtonSearchBase from "../button/ButtonSearchBase";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
};

export function CrudSearch({ value, onChange, onSearch, onClear }: Props) {
  return (
    <div className="flex w-full gap-2 items-center">
      <div className="relative w-full">
        <Input
          className="w-full bg-surface-container-lowest shadow-sm rounded-md pl-8 pr-12 py-3 focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/60 outline-none h-11 border-none placeholder:text-base"
          style={{
            backgroundColor: "var(--color-input-bg)",
            color: "var(--color-input-text)",
            borderColor: "var(--color-input-border)",
          }}
          placeholder="Termo da pesquisa radical"
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
        />
        <button
          type="button"
          onClick={onClear}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-outline hover:text-destructive transition-colors"
          aria-label="Limpar filtro"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      <ButtonSearchBase onClick={onSearch} />
    </div>
  );
}
