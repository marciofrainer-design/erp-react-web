import { ChevronLeft, ChevronRight } from "lucide-react";
import { TableBase } from "../table/TableBase";
import type { TableProps } from "../table/types";

const CrudTable = <T extends object>({
  rowsCount,
  totalRowsCount,
  ...props
}: TableProps<T>) => {
  const visibleRows = rowsCount ?? props.data.length;
  const totalRows = totalRowsCount ?? props.data.length;

  return (
    <div className="flex-1 bg-surface-container-lowest rounded-2xl shadow-ambient flex flex-col relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20"></div>
      <TableBase {...props} />
      <div className="px-6 py-3 bg-surface-container-low/50 flex items-center justify-between text-[11px] font-bold text-outline uppercase tracking-widest border-t border-outline-variant/10">
        <span>{`Exibindo ${visibleRows} de ${totalRows} registros`}</span>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 opacity-50 cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            Próximo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { CrudTable };
