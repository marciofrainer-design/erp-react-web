import type { TableProps } from "./types";
import { ArrowDown, Check } from "lucide-react";
import { FieldType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "../ui/table";

const TableBase = <T extends object>({
  columns,
  data,
  onRowClick,
  onRowDblClick,
  onCellChange,
  indexSelected,
  leadingColumn,
  lastColumn,
  getRowClassName,
  isDetailsTable = false,
}: TableProps<T>) => {
  const renderCellContent = (row: T, rowIndex: number, fieldColumn: TableProps<T>["columns"][number]) => {
    if (fieldColumn.cellRenderer) {
      return fieldColumn.cellRenderer(row, rowIndex);
    }

    if (fieldColumn.checkbox) {
      const checkboxConfig = fieldColumn.checkbox;
      const currentValue = row[fieldColumn.field];
      const isChecked = checkboxConfig.isChecked
        ? checkboxConfig.isChecked(currentValue, row, rowIndex)
        : currentValue === checkboxConfig.checkedValue;
      const handleCheckboxChange =
        checkboxConfig.onChange ??
        ((targetRow: T, value: T[keyof T], targetRowIndex: number) => {
          onCellChange?.(targetRow, targetRowIndex, fieldColumn.field, value);
        });
      const ariaLabel =
        typeof checkboxConfig.ariaLabel === "function"
          ? checkboxConfig.ariaLabel(row, rowIndex)
          : checkboxConfig.ariaLabel ?? `Alternar ${String(fieldColumn.field)}`;
      const disabled =
        typeof checkboxConfig.disabled === "function"
          ? checkboxConfig.disabled(row, rowIndex)
          : checkboxConfig.disabled ?? false;

      return (
        <input
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          readOnly={!handleCheckboxChange}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            event.stopPropagation();
            handleCheckboxChange?.(
              row,
              event.target.checked
                ? checkboxConfig.checkedValue
                : checkboxConfig.uncheckedValue,
              rowIndex,
            );
          }}
          className="w-4 h-4 cursor-pointer accent-primary disabled:cursor-not-allowed"
          aria-label={ariaLabel}
        />
      );
    }

    if (fieldColumn.type === FieldType.BOOLEAN) {
      return row[fieldColumn.field] ? (
        <Check className="w-6 h-6" />
      ) : (
        <ArrowDown className="w-6 h-6" />
      );
    }

    return String(row[fieldColumn.field] ?? "");
  };

  return (
    <div className="relative overflow-auto flex-1 max-h-97 no-scrollbar">
      <Table
        className="w-full text-left border-separate border-spacing-0"
        id="table-base"
      >
        <TableHeader
          className="bg-surface-container-low/95 backdrop-blur-md"
          style={{ backgroundColor: "var(--color-table-header-bg)" }}
        >
          <TableRow>
            {leadingColumn && (
              <TableHead
                className={`sticky top-0 z-20 px-4 py-4 bg-surface-container-low/95 backdrop-blur-md ${leadingColumn.width ?? "w-10"}`}
                style={{ backgroundColor: "var(--color-table-header-bg)" }}
              >
                {leadingColumn.header}
              </TableHead>
            )}
            {columns.map((c) =>
              isDetailsTable && !c.useDetails ? null : (
                <TableHead
                  key={String(c.field)}
                  className={`sticky top-0 z-20 px-6 py-4 text-[12px] font-extrabold text-outline uppercase tracking-widest border-b border-outline-variant/10 bg-surface-container-low/95 backdrop-blur-md ${c.width || ""}`}
                  style={{
                    color: "var(--color-table-text)",
                    backgroundColor: "var(--color-table-header-bg)",
                  }}
                >
                  {c.label}
                </TableHead>
              ),
            )}
            {lastColumn && (
              <TableHead
                className={`sticky top-0 z-20 px-4 py-4 bg-surface-container-low/95 backdrop-blur-md ${lastColumn.width ?? "w-10"}`}
                style={{ backgroundColor: "var(--color-table-header-bg)" }}
              >
                {lastColumn.footer}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-outline-variant/5">
          {data.map((row, i) => {
            const isSelected = indexSelected === i;
            const rowClassName = getRowClassName
              ? getRowClassName(row, i)
              : `transition-colors group cursor-pointer ${
                  isSelected
                    ? "bg-primary/15 hover:bg-primary/20"
                    : "bg-surface-container-low hover:bg-(--table-row-hover)"
                }`;

            return (
              <TableRow
                key={i}
                className={rowClassName}
                onClick={() => onRowClick?.(row, i)}
                onDoubleClick={() => onRowDblClick?.(row, i)}
              >
                {leadingColumn && (
                  <TableCell
                    className={`px-4 py-4 ${leadingColumn.width ?? "w-10"}`}
                  >
                    {leadingColumn.cell(row, i)}
                  </TableCell>
                )}
                {columns.map((c) =>
                  isDetailsTable && !c.useDetails ? null : (
                    <TableCell
                      key={String(c.field)}
                      className={`px-6 py-4 text-sm font-medium ${
                        isSelected && !getRowClassName
                          ? "font-semibold"
                          : "text-outline"
                      } ${c.width || ""}`}
                      style={{
                        color:
                          isSelected && !getRowClassName
                            ? "var(--color-primary)"
                            : "var(--color-table-text)",
                      }}
                    >
                      {renderCellContent(row, i, c)}
                    </TableCell>
                  ),
                )}
                {lastColumn && (
                  <TableCell
                    className={`px-4 py-4 ${lastColumn.width ?? "w-10"}`}
                  >
                    {lastColumn.cell(row, i)}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export { TableBase };
