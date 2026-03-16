import { ButtonBase } from "../button/ButtonBase";

export function CrudToolbar() {
  return (
    <div className="flex gap-1">

      <ButtonBase>Visualizar</ButtonBase>
      <ButtonBase>Novo</ButtonBase>
      <ButtonBase>Clonar</ButtonBase>
      <ButtonBase>Excluir</ButtonBase>
      <ButtonBase>Imprimir</ButtonBase>

      <div className="flex-1" />

      <ButtonBase>Fechar</ButtonBase>

    </div>
  )
}