import { ButtonBase } from "../button/ButtonBase";
import { CircleX, Printer, Trash2, Copy, CirclePlus, Eye } from 'lucide-react'

type CrudToolbarProps = {
  onView: () => void
  onNew: () => void
  onClone: () => void
  onDelete: () => void
  onPrint: () => void
  onClose: () => void
  hasSelected: boolean
}

export function CrudToolbar({ onView, onNew, onClone, onDelete, onPrint, onClose, hasSelected }: CrudToolbarProps) {
  const iconSize = 'w-6 h-6';
  return (
    <div className="flex gap-1">
      <ButtonBase onClick={onView} disabled={!hasSelected}>
        <Eye className={iconSize} />
        Visualizar
      </ButtonBase>
      <ButtonBase onClick={onNew}>
        <CirclePlus className={iconSize} />
        Novo
      </ButtonBase>
      <ButtonBase onClick={onClone} disabled={!hasSelected}>
        <Copy className={iconSize} />
        Clonar
      </ButtonBase>
      <ButtonBase onClick={onDelete} disabled={!hasSelected}>
        <Trash2 className={iconSize} />
        Excluir
      </ButtonBase>
      <ButtonBase onClick={onPrint}>
        <Printer className={iconSize} />
        Imprimir
      </ButtonBase>
      <div className="flex-1" />
      <ButtonBase onClick={onClose}>
        <CircleX className={iconSize} />
        Fechar
      </ButtonBase>
    </div>
  )
}