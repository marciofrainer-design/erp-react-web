import { ButtonBase } from "../button/ButtonBase";
import { Filter, Search } from 'lucide-react'

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
};

export function CrudSearch({ value, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2 flex-auto place-items-center">
      <button className="flex items-center gap-2 px-2 py-2 bg-slate-800 border border-slate-700 rounded text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors shadow-sm">
        <Filter className="w-4 h-4" />
        Filtros Avançados
      </button>
      <div className="flex-1" />
      <input
        className="border rounded px-3 py-2 flex-1"
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
