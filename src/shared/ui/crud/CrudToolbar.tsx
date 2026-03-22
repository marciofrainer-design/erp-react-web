import { ButtonBase } from "../button/ButtonBase";
import { CircleX, Printer, Trash2, Copy, CirclePlus, Eye } from 'lucide-react'

export function CrudToolbar() {
  const iconSize = 'w-6 h-6';
  return (
    <div className="flex gap-1">

      <ButtonBase>
        <Eye className={iconSize} />
        Visualizar</ButtonBase>
      <ButtonBase>
        <CirclePlus className={iconSize} />
        Novo</ButtonBase>
      <ButtonBase>
        <Copy className={iconSize} />
        Clonar</ButtonBase>
      <ButtonBase>
        <Trash2 className={iconSize} />
        Excluir
      </ButtonBase>
      <ButtonBase>
        <Printer className={iconSize} />
        Imprimir
      </ButtonBase>
      <div className="flex-1" />
      <ButtonBase>
        <CircleX className={iconSize} />
        Fechar
      </ButtonBase>
    </div>
  )
}