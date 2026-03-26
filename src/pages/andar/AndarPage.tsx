import { AndarColumns, type Andar } from "@/domain/andar/types"
import { CrudPage } from "@/components/crud/CrudPage"
import { AndarDependenciesFactory, type AndarDependencies } from "@/domain/andar/AndarDependenciesFactory"
import { useEffect, useState } from "react"

interface AndarPageProps {
  dependencies?: AndarDependencies;
}

export function AndarPage({ dependencies }: AndarPageProps = {}) {

  const { andarRepository } = dependencies ?? AndarDependenciesFactory.create();

  const [andarData, setAndarData] = useState<Andar[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndarData = async () => {
      try {
        setLoading(true)
        const data = await andarRepository.getAll()
        setAndarData(data)
      } catch (err) {
        console.error("Erro ao buscar dados de Andar:", err)
        setError("Erro ao carregar dados de Andar")
      } finally {
        setLoading(false)
      }
    }

    fetchAndarData()
  }, [andarRepository])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  return (
    <CrudPage
      title="Cadastro de Andar"
      tableColumns={AndarColumns}
      tableData={andarData}
    />
  )
}