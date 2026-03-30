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
  indexSelected,
}: TableProps<T>) => {
  return (
    <div className="overflow-auto flex-1 max-h-97">
      <Table className="w-full text-left border-collapse" id="table-base">
        <TableHeader
          className="sticky top-0 bg-surface-container-low/95 backdrop-blur-md z-10"
          style={{ backgroundColor: "var(--color-table-header-bg)" }}
        >
          <TableRow>
            {columns.map((c) => (
              <TableHead
                key={String(c.field)}
                className={`px-6 py-4 text-[12px] font-extrabold text-outline uppercase tracking-widest border-b border-outline-variant/10 ${c.width || ""}`}
                style={{
                  color: "var(--color-table-text)",
                }}
              >
                {c.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-outline-variant/5">
          {data.map((row, i) => {
            const isSelected = indexSelected === i;

            return (
              <TableRow
                key={i}
                className={`transition-colors group cursor-pointer ${
                  isSelected
                    ? "bg-primary/15 hover:bg-primary/20"
                    : "bg-surface-container-low hover:bg-(--table-row-hover)"
                }`}
                onClick={() => onRowClick?.(row, i)}
                onDoubleClick={() => onRowDblClick?.(row, i)}
              >
                {columns.map((c) => (
                  <TableCell
                    key={String(c.field)}
                    className={`px-6 py-4 text-sm font-medium ${
                      isSelected ? "font-semibold" : "text-outline"
                    } ${c.width || ""}`}
                    style={{
                      color: isSelected
                        ? "var(--color-primary)"
                        : "var(--color-table-text)",
                    }}
                  >
                    {c.type === FieldType.BOOLEAN ? (
                      row[c.field] ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <ArrowDown className="w-6 h-6" />
                      )
                    ) : (
                      String(row[c.field])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export { TableBase };
