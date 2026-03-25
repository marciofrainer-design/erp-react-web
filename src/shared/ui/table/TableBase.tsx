import type { TableProps } from "./types";
import { Check, CircleX } from "lucide-react";
import { FieldType } from "@/shared/types";

const TableBase = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <div className="flex-1 overflow-auto custom-scrollbar">
      <table
        className="w-full text-sm text-left border-collapse"
        id="table-base"
      >
        <thead className="sticky top-0 bg-slate-900 shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)] z-10">
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.field)}
                className={`text-left px-6 py-3 font-semibold text-slate-200 border-b border-slate-800 ${c.width || ""}`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800/50">
          {data.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-slate-900/50 cursor-pointer transition-colors group"
            >
              {columns.map((c) => (
                <td
                  key={String(c.field)}
                  className={`px-6 py-2.5 font-medium hover:text-slate-200 text-slate-500 ${c.width || ""}`}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TableBase };
