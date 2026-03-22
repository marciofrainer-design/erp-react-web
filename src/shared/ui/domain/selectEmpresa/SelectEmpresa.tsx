import type { SelectEmpresaProps } from "./types";

const SelectEmpresa = ({ data }: SelectEmpresaProps) => {
  return (
    <div className="flex flex-row w-full gap-4 items-center">
      <label className="text-xs font-semibold text-slate-200">
        Estabelecimento
      </label>
      <select className="text-sm bg-slate-800 border-slate-700 text-slate-200 rounded shadow-sm focus:ring-slate-600 focus:border-slate-600 min-w-250 py-1 px-2">
        {data &&
          data.map((e) => (
            <option key={e.idempresa} value={e.idempresa} className="bg-slate-800 text-slate-200">
              {e.nmfantasia}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectEmpresa;
