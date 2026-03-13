type Column<T> = {
  label: string
  field: keyof T
}

type Props<T> = {
  columns: Column<T>[]
  data: T[]
}

export function CrudTable<T extends object>({ columns, data }: Props<T>) {
  return (
    <table className="w-full border text-sm">

      <thead className="bg-gray-200">
        <tr>
          {columns.map((c) => (
            <th key={String(c.field)} className="text-left p-2 border">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-gray-100">

            {columns.map((c) => (
              <td key={String(c.field)} className="p-2 border">
                {String(row[c.field])}
              </td>
            ))}

          </tr>
        ))}
      </tbody>

    </table>
  )
}