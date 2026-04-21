import { ChevronLeft, ChevronRight } from "lucide-react";
import { TableBase } from "../table/TableBase";
import type { TableProps } from "../table/types";
import { useAppTranslation } from "@/i18n/useAppTranslation";

const CrudTable = <TList extends object>({
  rowsCount,
  totalRowsCount,
  currentPage = 1,
  totalPageCount = 1,
  onPageChange,
  ...props
}: TableProps<TList>) => {
  const { t } = useAppTranslation("crud");
  const visibleRows = rowsCount ?? props.data.length;
  const totalRows = totalRowsCount ?? props.data.length;
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPageCount;

  return (
    <div className="flex-1 bg-surface-container-lowest rounded-2xl shadow-ambient flex flex-col relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20"></div>
      <TableBase {...props} />
      <div className="px-6 py-3 bg-surface-container-low/50 flex items-center justify-between text-[11px] font-bold text-outline uppercase tracking-widest border-t border-outline-variant/10">
        <span>{t("table.displaying", { visibleRows, totalRows })}</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => canGoPrevious && onPageChange?.(currentPage - 1)}
            disabled={!canGoPrevious}
            className={`flex items-center gap-1 transition-colors ${
              canGoPrevious
                ? "hover:text-primary"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> {t("table.previous")}
          </button>
          <span className="text-[10px] text-muted-foreground">
            {currentPage}/{totalPageCount}
          </span>
          <button
            type="button"
            onClick={() => canGoNext && onPageChange?.(currentPage + 1)}
            disabled={!canGoNext}
            className={`flex items-center gap-1 transition-colors ${
              canGoNext ? "hover:text-primary" : "opacity-50 cursor-not-allowed"
            }`}
          >
            {t("table.next")} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { CrudTable };
