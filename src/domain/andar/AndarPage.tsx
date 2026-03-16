import { getAndar } from "@/store/andar"
import { AndarColumns } from "@/domain/andar/AndarTypes"
import { CrudPage } from "@/components/infra/crud/CrudPage"

export function AndarPage() {

  const data = getAndar();

  return (
    <CrudPage
      title="Cadastro de Andar"
      tableColumns={AndarColumns}
      tableData={data}
    />
  )
}