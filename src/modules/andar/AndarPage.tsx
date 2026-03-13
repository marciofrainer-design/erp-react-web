import { CrudPageTemplate } from "@/components/crud/CrudPageTemplate"
import { CrudSearch } from "@/components/crud/CrudSearch"
import { CrudTable } from "@/components/crud/CrudTable"
import { CrudToolbar } from "@/components/crud/CrudToolbar"

type Andar = {
  chave: number
  nome: string
  estab: string
  identificador: string
}

export function AndarPage() {

  const data: Andar[] = [
    { chave: 1, nome: "PRIMEIRO", estab: "FAROL", identificador: "PRI" },
    { chave: 2, nome: "SEGUNDO", estab: "FAROL", identificador: "SEG" },
    { chave: 10, nome: "TERREO", estab: "FAROL", identificador: "TER" }
  ]

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
          columns={[
            { label: "Chave", field: "chave" },
            { label: "Nome", field: "nome" },
            { label: "Estab", field: "estab" },
            { label: "Identificador", field: "identificador" }
          ]}
          data={data}
        />
      }

      actions={<CrudToolbar />}
    />
  )
}