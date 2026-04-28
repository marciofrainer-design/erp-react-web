import { useMemo, useState, useCallback, useEffect } from "react";
import { normalizeSearchText } from "@/utils";
import type { EntityBase } from "@/types";
import type { SelectionListProps } from "./types";
import type { SelectFilterFn } from "@/components/select/selectRepository.types";

type UseSelectionListOptions<T extends EntityBase> = Pick<
  SelectionListProps<T>,
  "repository" | "mapper" | "primaryKeyField" | "value" | "onChange" | "allowDuplicates"
>;

export function useSelectionList<T extends EntityBase>({
  repository,
  mapper,
  primaryKeyField,
  value,
  onChange,
  allowDuplicates = false,
}: UseSelectionListOptions<T>) {
  const [allItems, setAllItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    repository
      .getAll({ page: 1, pageCount: 1, limit: 9999 })
      .then((result) => { if (!cancelled) setAllItems(result.data); })
      .catch(() => { if (!cancelled) setAllItems([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [repository]);

  const [pendingValue, setPendingValue] = useState("");
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set());

  // Conjunto de chaves dos itens já presentes na lista
  const valueKeys = useMemo(
    () => new Set(value.map((item) => String(item[primaryKeyField]))),
    [value, primaryKeyField],
  );

  // filterFn para o SelectRepository: exclui itens já na lista (quando allowDuplicates=false)
  // e ainda aplica a busca por texto quando search não está vazio
  const filterFn: SelectFilterFn<T> | undefined = useMemo(() => {
    if (allowDuplicates) return undefined;

    return (item: T, search: string) => {
      const notInList = !valueKeys.has(String(item[primaryKeyField]));
      if (!notInList) return false;
      if (!search) return true;

      // aplicar busca por texto nos campos de label
      const label = mapper.labelKeys
        .map((k) => String(item[k] ?? ""))
        .join(" — ");
      return normalizeSearchText(label).includes(search);
    };
  }, [allowDuplicates, valueKeys, primaryKeyField, mapper.labelKeys]);

  // Item completo correspondente ao valor pendente selecionado no dropdown
  const pendingItem = useMemo(() => {
    if (!pendingValue) return null;
    return allItems.find((item) => String(item[mapper.valueKey]) === pendingValue) ?? null;
  }, [pendingValue, allItems, mapper.valueKey]);

  const canAdd = Boolean(pendingItem);

  const handleAdd = useCallback(() => {
    if (!pendingItem) return;
    onChange([...value, pendingItem]);
    setPendingValue("");
  }, [pendingItem, value, onChange]);

  const handleToggleCheck = useCallback((key: string) => {
    setCheckedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const allChecked = value.length > 0 && checkedKeys.size === value.length;
  const someChecked = checkedKeys.size > 0 && !allChecked;

  const handleToggleAll = useCallback(() => {
    if (allChecked || someChecked) {
      setCheckedKeys(new Set());
    } else {
      setCheckedKeys(new Set(value.map((item) => String(item[primaryKeyField]))));
    }
  }, [allChecked, someChecked, value, primaryKeyField]);

  const handleRemoveChecked = useCallback(() => {
    onChange(value.filter((item) => !checkedKeys.has(String(item[primaryKeyField]))));
    setCheckedKeys(new Set());
  }, [value, checkedKeys, primaryKeyField, onChange]);

  const handleRemoveRow = useCallback(
    (key: string) => {
      onChange(value.filter((item) => String(item[primaryKeyField]) !== key));
    },
    [value, primaryKeyField, onChange],
  );

  return {
    loading,
    pendingValue,
    setPendingValue,
    checkedKeys,
    allChecked,
    someChecked,
    canAdd,
    filterFn,
    handleAdd,
    handleToggleCheck,
    handleToggleAll,
    handleRemoveChecked,
    handleRemoveRow, // Added to support direct row removal
  };
}
