import type { SelectEmpresaProps } from "./SelectEmpresaTypes";

const SelectEmpresa = ({ data }: SelectEmpresaProps) => {
    return (
        <div className="flex flex-row w-full gap-4 items-center">
            <h1>Estabelecimento</h1>
            <div className="flex-1" />
            <select className="min-w-2xl w-full border border-gray-300 rounded px-2 py-1">
                {data && data.map((e) => (
                    <option key={e.idempresa} value={e.idempresa}>
                        {e.nmfantasia}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectEmpresa;