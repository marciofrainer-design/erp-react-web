import { Filter } from "lucide-react";

const CrudButtonAdvancedFilters = () => {
  return (
    <button
      className="flex items-center gap-2 px-2 py-2 rounded text-sm font-medium transition-colors shadow-sm"
      style={{
        backgroundColor: "var(--color-select-bg)",
        color: "var(--color-select-text)",
        border: "1px solid var(--color-select-border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--color-bg-tertiary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--color-select-bg)";
      }}
    >
      <Filter className="w-4 h-4" />
      Filtros Avançados
    </button>
  );
};

export default CrudButtonAdvancedFilters;
