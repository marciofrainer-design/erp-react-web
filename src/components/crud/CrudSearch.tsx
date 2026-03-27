import ButtonSearchBase from "../button/ButtonSearchBase";
import { Input } from "../ui/input";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
};

export function CrudSearch({ value, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2 flex-auto place-items-center">
      <div className="flex-2" />
      <Input
        className="w-full bg-surface-container-lowest border-none shadow-sm rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/60 outline-none"
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
