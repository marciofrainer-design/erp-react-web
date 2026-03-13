export function CrudToolbar() {
  return (
    <div className="flex gap-2">

      <button className="btn">Visualizar</button>
      <button className="btn">Novo</button>
      <button className="btn">Clonar</button>
      <button className="btn text-red-600">Excluir</button>
      <button className="btn">Imprimir</button>

      <div className="flex-1" />

      <button className="btn">Fechar</button>

    </div>
  )
}