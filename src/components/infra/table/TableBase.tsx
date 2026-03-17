import type { TableProps } from "./TableTypes";

const TableBase = <T extends object>({ columns, data }: TableProps<T>) => {

  return (
    <table className="w-full border">

      <thead className="bg-gray-300">
        <tr>
          {columns.map((c) => (
            <th key={String(c.field)} className={`text-left p-2 border ${c.width || ''}`}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-gray-200">

            {columns.map((c) => (
              <td key={String(c.field)} className={`p-2 border ${c.width || ''}`}>
                {String(row[c.field])}
              </td>
            ))}

          </tr>
        ))}
      </tbody>

    </table>
  )
}

export { TableBase };