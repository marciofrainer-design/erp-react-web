import { ButtonBase } from "../button/ButtonBase";
import { Search } from 'lucide-react'

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
};

export function CrudSearch({ value, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2 flex-auto place-items-center">
      <div className="flex-2" />
      <input
        className="border rounded px-3 py-2 flex-1 outline-none"
        style={{
          backgroundColor: 'var(--color-input-bg)',
          color: 'var(--color-input-text)',
          borderColor: 'var(--color-input-border)',
        }}
        placeholder="Termo da pesquisa radical"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <ButtonBase onClick={onSearch}>
        <Search className="w-4 h-4" />
        Pesquisar
      </ButtonBase>
    </div>
  );
}
