import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useConfirm, useNotify } from "@/hooks";
import { getErrorMessage, normalizeSearchText, stringifyForSearch } from "@/utils";
import { CRUD_DEFAULT_LIMIT, CRUD_DEFAULT_PAGE } from "@/components/crud/consts";
import type { CrudDetailMode, UseCrudDetailOptions } from "@/components/crud/tabs/types";

export function useCrudDetail<T extends object>({
  repository,
  parentIdField,
  parentId,
  primaryKeyName,
  createBlankItem,
  validate,
}: UseCrudDetailOptions<T>) {
  const { t } = useAppTranslation("crud");
  const notify = useNotify();
  const confirm = useConfirm();

  const [mode, setMode] = useState<CrudDetailMode>("table");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<T>(() => createBlankItem(parentId));
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(CRUD_DEFAULT_PAGE);
  const [pageCount, setPageCount] = useState(CRUD_DEFAULT_PAGE);
  const [limit] = useState(CRUD_DEFAULT_LIMIT);
  const [totalRows, setTotalRows] = useState(0);

  const filteredData = useMemo(() => {
    const term = normalizeSearchText(searchTerm.trim());
    if (!term) return data;
    return data.filter((row) =>
      normalizeSearchText(stringifyForSearch(row)).includes(term),
    );
  }, [searchTerm, data]);

  const selectedItem = useMemo(() => {
    return selectedIndex !== null ? filteredData[selectedIndex] : null;
  }, [selectedIndex, filteredData]);

  const fetchData = useCallback(async () => {
    if (!parentId) return;
    try {
      setLoading(true);
      const result = await repository.getAll({
        page: currentPage,
        pageCount,
        limit,
      });
      // Filtra apenas registros do pai na resposta (se o backend não faz isso, filtra aqui)
      const filtered = result.data.filter(
        (item) => String(item[parentIdField]) === String(parentId),
      );
      setData(filtered);
      setPageCount(result.pageCount);
      setCurrentPage(result.page);
      setTotalRows(result.total);
    } catch (err: unknown) {
      notify.error(
        `${t("notifications.loadingDataError", { defaultValue: "Erro ao carregar dados" })}: ${getErrorMessage(err)}`,
      );
    } finally {
      setLoading(false);
    }
  }, [repository, parentId, parentIdField, notify, t, currentPage, pageCount, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset ao trocar de pai
  useEffect(() => {
    setMode("table");
    setSelectedIndex(null);
    setSearchValue("");
    setSearchTerm("");
    setFormData(createBlankItem(parentId));
  }, [parentId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = useCallback(() => {
    setSearchTerm(searchValue);
    setSelectedIndex(null);
  }, [searchValue]);

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    setSearchTerm("");
    setSelectedIndex(null);
  }, []);

  const handleRowClick = useCallback((_: T, index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleRowDblClick = useCallback(
    (_: T, index: number) => {
      setSelectedIndex(index);
      setFormData({ ...filteredData[index] });
      setMode("edit");
    },
    [filteredData],
  );

  const handleNew = useCallback(() => {
    setSelectedIndex(null);
    setFormData(createBlankItem(parentId));
    setMode("new");
  }, [createBlankItem, parentId]);

  const handleEdit = useCallback(() => {
    if (!selectedItem) return;
    setFormData({ ...selectedItem });
    setMode("edit");
  }, [selectedItem]);

  const handleDelete = useCallback(async () => {
    if (!selectedItem) return;
    const pk = selectedItem[primaryKeyName];
    if (!pk) {
      notify.error(t("notifications.invalidPrimaryKey"));
      return;
    }
    const shouldDelete = await confirm({
      title: t("confirmations.deleteTitle"),
      description: t("confirmations.deleteDescription"),
      confirmText: t("confirmations.deleteConfirmText"),
      cancelText: t("confirmations.deleteCancelText"),
      variant: "destructive",
    });
    if (!shouldDelete) return;
    try {
      await repository.delete(pk as number);
      notify.success(t("notifications.deleteSuccess"));
      await fetchData();
      setSelectedIndex(null);
    } catch {
      notify.error(t("notifications.deleteError"));
    }
  }, [selectedItem, primaryKeyName, repository, fetchData, notify, confirm, t]);

  const handleCancel = useCallback(async () => {
    const shouldCancel = await confirm({
      title: t("confirmations.cancelTitle"),
      description: t("confirmations.cancelDescription"),
      confirmText: t("confirmations.cancelConfirmText"),
      cancelText: t("confirmations.cancelCancelText"),
      variant: "destructive",
    });
    if (shouldCancel) {
      setMode("table");
      setFormData(createBlankItem(parentId));
    }
  }, [confirm, t, createBlankItem, parentId]);

  const handleSave = useCallback(async () => {
    if (validate && !validate(formData)) {
      notify.warning(t("notifications.formInvalid"));
      return;
    }
    const shouldSave = await confirm({
      title: t("confirmations.saveTitle"),
      description: t("confirmations.saveDescription"),
      confirmText: t("confirmations.saveConfirmText"),
      cancelText: t("confirmations.saveCancelText"),
      variant: "default",
    });
    if (!shouldSave) return;
    try {
      if (mode === "edit") await repository.update(formData);
      else await repository.save(formData);
      notify.success(t("notifications.savingSuccess"));
      await fetchData();
      setMode("table");
      setFormData(createBlankItem(parentId));
    } catch {
      notify.error(t("notifications.savingError"));
    }
  }, [formData, repository, fetchData, mode, validate, notify, confirm, t, createBlankItem, parentId]);

  const handleRegisterChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      setSelectedIndex(null);
      const max = Math.max(CRUD_DEFAULT_PAGE, pageCount);
      setCurrentPage(Math.min(Math.max(nextPage, CRUD_DEFAULT_PAGE), max));
    },
    [pageCount],
  );

  const isFormValid = validate ? validate(formData) : true;
  const showTable = mode === "table";

  return {
    mode,
    selectedIndex,
    searchValue,
    setSearchValue,
    formData,
    data,
    loading,
    filteredData,
    selectedItem,
    showTable,
    isFormValid,
    currentPage,
    pageCount,
    totalRows,
    handlers: {
      search: handleSearch,
      clearSearch: handleClearSearch,
      rowClick: handleRowClick,
      rowDblClick: handleRowDblClick,
      new: handleNew,
      edit: handleEdit,
      delete: handleDelete,
      cancel: handleCancel,
      save: handleSave,
      registerChange: handleRegisterChange,
      pageChange: handlePageChange,
    },
  };
}
