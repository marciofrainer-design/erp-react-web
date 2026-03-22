import type { CrudPageProps } from "./types"
import { CrudPageTemplate } from "./CrudPageTemplate"
import { CrudSearch } from "./CrudSearch"
import { CrudTable } from "./CrudTable"
import { CrudToolbar } from "./CrudToolbar"
import SelectEmpresa from "@/shared/ui/domain/selectEmpresa/SelectEmpresa"
import { getEmpresa } from "@/store/empresa"

function CrudPage<T extends object>({title, tableColumns, tableData}: CrudPageProps<T>) {
  return (
    <CrudPageTemplate
      title={title}
      
      company={<SelectEmpresa data={getEmpresa()} />}

      search={
        <CrudSearch
          value=""
          onChange={() => {}}
          onSearch={() => {}}
        />
      }

      table={
        <CrudTable
          columns={tableColumns}
          data={tableData}
        />
      }

      actions={<CrudToolbar />}
    />
  )
}

export { CrudPage }