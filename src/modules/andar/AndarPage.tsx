import { CrudPageTemplate } from "@/components/crud/CrudPageTemplate"
import { CrudSearch } from "@/components/crud/CrudSearch"
import { CrudTable } from "@/components/crud/CrudTable"
import { CrudToolbar } from "@/components/crud/CrudToolbar"
import { getAndar } from "@/store/andar"
import { AndarColumns } from "@/modules/andar/AndarTypes"

export function AndarPage() {

  const data = getAndar();

  return (
    <CrudPageTemplate
      title="Cadastro de Andar"

      search={
        <CrudSearch
          value=""
          onChange={() => {}}
          onSearch={() => {}}
        />
      }

      table={
        <CrudTable
          columns={AndarColumns}
          data={data}
        />
      }

      actions={<CrudToolbar />}
    />
  )
}