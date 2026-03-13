type Props = {
  value: string
  onChange: (v: string) => void
  onSearch: () => void
}

export function CrudSearch({ value, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2">

      <input
        className="border rounded px-3 py-2 flex-1"
        placeholder="Termo da pesquisa"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pesquisar
      </button>

    </div>
  )
}