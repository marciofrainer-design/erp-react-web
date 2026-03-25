import { TableBase } from "../table/TableBase"
import type { TableProps } from "../table/types"

const CrudTable = <T extends object>(props: TableProps<T>) => {
  return (
    <TableBase {...props} />
  )
}

export { CrudTable };