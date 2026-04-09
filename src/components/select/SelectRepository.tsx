import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Loading } from "@/components/loading/Loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SpanError } from "@/components/inputs/SpanError";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useSelectRepository } from "@/hooks/useSelectRepository";
import type { SelectRepositoryProps } from "./selectRepository.types";

export function SelectRepository<T>({
  repository,
  mapper,
  label,
  Icon,
  value = "",
  onChange,
  searchable = true,
  searchPlaceholder,
  filterFn,
  emptyMessage,
  placeholder,
  disabled = false,
  error,
  lazy = false,
  initialLabel,
}: SelectRepositoryProps<T>) {
  const { t } = useAppTranslation(["components"]);
  const [open, setOpen] = useState(false);

  const { filteredOptions, allOptions, loading, search, setSearch, setEnabled } =
    useSelectRepository({ repository, mapper, filterFn, lazy });

  const triggerLabel = useMemo(
    () => allOptions.find((o) => o.value === value)?.triggerLabel ?? (lazy ? (initialLabel ?? "") : ""),
    [allOptions, value, lazy, initialLabel],
  );

  // Propaga mudanças para o pai
  useEffect(() => {
    if (value && allOptions.length > 0) {
      const found = allOptions.find((o) => o.value === value);
      if (!found) onChange("");
    }
  }, [allOptions, value, onChange]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && lazy) {
      setEnabled(true);
    }
    setOpen(isOpen);
  };

  if (loading) {
    return (
      <Loading
        variant="inline"
        size="sm"
        title={t("selects.loading.title", { ns: "components" })}
        description={t("selects.loading.description", { ns: "components" })}
        className="min-h-16"
      />
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[10px] uppercase font-bold text-outline tracking-wider mb-1 ml-3 px-1">
        {label}
      </label>
      <div
        className={cn(
          "flex items-center bg-surface-container-lowest shadow-sm rounded-xl px-4 py-2 gap-3 min-w-56 border border-outline-variant/20 transition-colors",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-surface-container",
          error && "border-destructive",
        )}
      >
        {Icon && <Icon className="text-primary w-5 h-5 shrink-0" />}
        <Select
          value={value}
          onValueChange={(v) => onChange(v || "")}
          disabled={disabled}
          open={open}
          onOpenChange={handleOpenChange}
        >
          <SelectTrigger className="flex-1 border-none shadow-none p-0 h-auto bg-transparent focus-visible:ring-0">
            <SelectValue
              placeholder={
                placeholder ??
                `${t("selects.labelDefault", { ns: "components" })} ${label.toLowerCase()}`
              }
            >
              {triggerLabel || undefined}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="p-0">
            {searchable && (
              <div className="flex items-center gap-2 px-3 py-2 border-b border-outline-variant/20 sticky top-0 bg-surface-container-lowest z-10">
                <Search className="w-4 h-4 text-outline shrink-0" />
                <input
                  autoFocus
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-outline/60"
                  placeholder={
                    searchPlaceholder ??
                    t("selects.searchPlaceholder", { ns: "components", defaultValue: "Filtrar..." })
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <SelectGroup>
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-4 text-sm text-outline text-center">
                  {emptyMessage ??
                    t("selects.emptyResult", {
                      ns: "components",
                      defaultValue: "Nenhuma opção encontrada.",
                    })}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {error && <SpanError error={error} />}
    </div>
  );
}
