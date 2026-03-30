import ButtonSearchBase from "../button/ButtonSearchBase";
import { Input } from "../ui/input";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
};

export function CrudSearch({ value, onChange, onSearch }: Props) {
  return (
    <div className="flex w-full gap-2 items-center">
      <Input
        className="w-full bg-surface-container-lowest shadow-sm rounded-md pl-12 pr-4 py-3 text-2xl focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/60 outline-none h-16 border-none"
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
      />
      <ButtonSearchBase onClick={onSearch} />
    </div>
  );
}
