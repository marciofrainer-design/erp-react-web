import { useMemo, useState, useEffect } from "react";
import { useFetchAll } from "@/hooks/useFetchAll";
import { useNotify } from "@/hooks";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { normalizeSearchText } from "@/utils";
import type {
  SelectOption,
  UseSelectRepositoryOptions,
} from "../components/select/selectRepository.types";

export function useSelectRepository<T>({
  repository,
  mapper,
  filterFn,
  lazy = false,
}: UseSelectRepositoryOptions<T>) {
  const { t } = useAppTranslation(["components", "crud"]);
  const notify = useNotify();
  const [search, setSearch] = useState("");
  const [enabled, setEnabled] = useState(!lazy);

  const { data, loading, error } = useFetchAll<T>(repository, enabled);

  useEffect(() => {
    if (error) {
      notify.error(t("notifications.loadingDataError", { ns: "crud" }));
    }
  }, [error, notify, t]);

  const allOptions = useMemo<SelectOption[]>(() => {
    return data.map((item) => {
      const value = String(item[mapper.valueKey] ?? "");

      const label = mapper.labelKeys
        .map((k) => item[k])
        .filter((v) => v !== null && v !== undefined && v !== "")
        .join(" — ");

      const triggerLabel = mapper.triggerLabelKey
        ? String(item[mapper.triggerLabelKey] ?? "")
        : label;

      return { value, label, triggerLabel };
    });
  }, [data, mapper]);

  const filteredOptions = useMemo<SelectOption[]>(() => {
    const term = normalizeSearchText(search.trim());

    if (!term) {
      if (!filterFn) return allOptions;
      return allOptions.filter((_, index) => filterFn(data[index], ""));
    }

    return allOptions.filter((_, index) => {
      if (filterFn) return filterFn(data[index], term);
      return normalizeSearchText(allOptions[index].label).includes(term);
    });
  }, [allOptions, search, filterFn, data]);

  return { filteredOptions, allOptions, loading, search, setSearch, setEnabled };
}
