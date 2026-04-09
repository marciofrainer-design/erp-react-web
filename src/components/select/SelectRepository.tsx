import { useEffect, useMemo, useRef, useState } from "react";
import { ListFilter, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Loading } from "@/components/loading/Loading";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useSelectRepository } from "@/hooks/useSelectRepository";
import type { SelectRepositoryProps } from "./selectRepository.types";
import SelectBase from "./SelectBase";

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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const {
    filteredOptions,
    allOptions,
    loading,
    search,
    setSearch,
    setEnabled,
  } = useSelectRepository({ repository, mapper, filterFn, lazy });

  const triggerLabel = useMemo(
    () =>
      allOptions.find((o) => o.value === value)?.triggerLabel ??
      (lazy ? (initialLabel ?? "") : ""),
    [allOptions, value, lazy, initialLabel],
  );

  // Propaga mudanças para o pai
  useEffect(() => {
    if (value && allOptions.length > 0) {
      const found = allOptions.find((o) => o.value === value);
      if (!found) onChange("");
    }
  }, [allOptions, value, onChange]);

  // Reset focusedIndex quando o filtro muda
  useEffect(() => {
    setFocusedIndex(-1);
  }, [search]);

  // Limpa busca e foco quando o dropdown fecha
  useEffect(() => {
    if (!open) {
      setSearch("");
      setFocusedIndex(-1);
    }
  }, [open, setSearch]);

  // Rola o item focado para a área visível
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll<HTMLElement>('[data-slot="select-item"]');
      items[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && lazy) {
      setEnabled(true);
    }
    setOpen(isOpen);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (filteredOptions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev === -1 ? 0 : Math.min(prev + 1, filteredOptions.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev <= 0 ? 0 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex === -1) {
        setFocusedIndex(0);
      } else {
        onChange(filteredOptions[focusedIndex].value);
        setOpen(false);
      }
    }
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
    <SelectBase
      label={label}
      Icon={Icon ?? ListFilter}
      error={error}
      value={value}
      onValueChange={(v: string) => onChange(v || "")}
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
      <SelectContent className="p-0" side="bottom" alignItemWithTrigger={false}>
        {searchable && (
          <div className="flex items-center gap-2 px-3 py-2 border-b border-outline-variant/20 sticky top-0 bg-surface-container-lowest z-10">
            <Search className="w-4 h-4 text-outline shrink-0" />
            <input
              autoFocus
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-outline/60"
              placeholder={
                searchPlaceholder ??
                t("selects.searchPlaceholder", {
                  ns: "components",
                  defaultValue: "Filtrar...",
                })
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        )}
        <SelectGroup>
          <div ref={listRef}>
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-sm text-outline text-center">
                {emptyMessage ??
                  t("selects.emptyResult", {
                    ns: "components",
                    defaultValue: "Nenhuma opção encontrada.",
                  })}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={cn(focusedIndex === index && "bg-accent text-accent-foreground")}
                >
                  {option.label}
                </SelectItem>
              ))
            )}
          </div>
        </SelectGroup>
      </SelectContent>
    </SelectBase>
  );
}
