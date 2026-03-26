import type { TableProps } from "./types";
import { Check, CircleX } from "lucide-react";
import { FieldType } from "@/shared/types";

const TableBase = <T extends object>({ columns, data, selectedIndex, onRowClick }: TableProps<T>) => {
  return (
    <div className="flex-1 overflow-auto custom-scrollbar">
      <table className="w-full text-sm text-left border-collapse" id="table-base">
        <thead
          className="sticky top-0 shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)] z-10"
          style={{ backgroundColor: "var(--color-table-header-bg)" }}
        >
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.field)}
                className={`text-left px-6 py-3 font-semibold ${c.width || ""}`}
                style={{
                  color: "var(--color-table-text)",
                  borderBottom: "1px solid var(--color-table-border)",
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => {
            const isSelected = i === selectedIndex;
            return (
              <tr
                key={i}
                className="cursor-pointer transition-colors group"
                style={{
                  borderBottom: "1px solid var(--color-table-border)",
                  backgroundColor: isSelected ? "var(--color-table-row-selected-bg)" : "var(--color-table-row-bg)",
                }}
                onClick={() => onRowClick?.(row, i)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "var(--color-table-row-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.backgroundColor = isSelected ? "var(--color-table-row-selected-bg)" : "var(--color-table-row-bg)";
                }}
              >
                {columns.map((c) => (
                  <td
                    key={String(c.field)}
                    className={`px-6 py-2.5 font-medium ${c.width || ""}`}
                    style={{ color: "var(--color-table-text)" }}
                  >
                    {c.type === FieldType.BOOLEAN ? (
                      row[c.field] ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <CircleX className="w-6 h-6" />
                      )
                    ) : (
                      String(row[c.field])
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { TableBase };
