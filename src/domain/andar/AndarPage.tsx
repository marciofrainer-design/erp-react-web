import { getAndar } from "@/store/andar"
import { AndarColumns } from "@/domain/andar/types"
import { CrudPage } from "@/shared/ui/crud/CrudPage"

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