import { useMemo, useState, useCallback, useEffect } from "react";
import type { CrudMode, UseCrudOptions } from "@/components/crud/types";
import { useConfirm, useNotify } from "@/hooks";
import {
  getErrorMessage,
  normalizeSearchText,
  stringifyForSearch,
} from "@/utils";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { CRUD_DEFAULT_LIMIT, CRUD_DEFAULT_PAGE } from "@/components/crud/consts";

export function useCrud<T extends object>({
  createNewItem,
  dependencies,
  validate,
}: UseCrudOptions<T>) {
  const { t } = useAppTranslation("crud");
  const notify = useNotify();
  const confirm = useConfirm();

  const [mode, setMode] = useState<CrudMode>("table");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<T>(
    () => createNewItem?.() ?? ({} as T),
  );
  const { repository, primaryKeyName } = dependencies || {};
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(CRUD_DEFAULT_PAGE);
  const [pageCount, setPageCount] = useState(CRUD_DEFAULT_PAGE);
  const [limit] = useState(CRUD_DEFAULT_LIMIT);
  const [totalRows, setTotalRows] = useState(0);

  const filteredTableData = useMemo(() => {
    const term = normalizeSearchText(searchTerm.trim());
    if (!term) return data;
    return data.filter((row) =>
      normalizeSearchText(stringifyForSearch(row)).includes(term),
    );
  }, [searchTerm, data]);

  const selectedItem = useMemo(() => {
    return selectedIndex !== null ? filteredTableData[selectedIndex] : null;
  }, [selectedIndex, filteredTableData]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await repository.getAll({
        page: currentPage,
        pageCount,
        limit,
      });
      setData(result.data);
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
  }, [repository, notify, t, currentPage, pageCount, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (
      selectedIndex !== null &&
      (selectedIndex < 0 || selectedIndex >= filteredTableData.length)
    ) {
      setSelectedIndex(null);
    }
  }, [filteredTableData.length, selectedIndex]);

  const handleSearch = useCallback(() => {
    setSearchTerm(searchValue);
    setSelectedIndex(null);
  }, [searchValue]);

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    setSearchTerm("");
    setSelectedIndex(null);
  }, []);

  const handleRowClick = useCallback(
    (_: T, index: number) => {
      setSelectedIndex(index);
      if (mode !== "table") setMode("table");
    },
    [mode],
  );

  const handleRowDblClick = useCallback(
    async (_: T, index: number) => {
      setSelectedIndex(index);
      const item = filteredTableData[index];
      if (repository && primaryKeyName) {
        const id = item[primaryKeyName as keyof T] as number;
        try {
          setLoadingDetail(true);
          const fullItem = await repository.getById(id);
          setFormData(fullItem);
        } catch {
          setFormData({ ...item });
        } finally {
          setLoadingDetail(false);
        }
      } else {
        setFormData({ ...item });
      }
      setMode("view");
    },
    [filteredTableData, repository, primaryKeyName],
  );

  const handleView = useCallback(async () => {
    if (!selectedItem) return;
    if (repository && primaryKeyName) {
      const id = selectedItem[primaryKeyName as keyof T] as number;
      try {
        setLoadingDetail(true);
        const fullItem = await repository.getById(id);
        setFormData(fullItem);
      } catch {
        setFormData({ ...selectedItem });
      } finally {
        setLoadingDetail(false);
      }
    } else {
      setFormData({ ...selectedItem });
    }
    setMode("view");
  }, [selectedItem, repository, primaryKeyName]);

  const handleNew = useCallback(() => {
    setSelectedIndex(null);
    setFormData(createNewItem?.() ?? ({} as T));
    setMode("new");
  }, [createNewItem]);

  const handleClone = useCallback(() => {
    if (!selectedItem) return;
    setFormData({ ...selectedItem });
    setMode("clone");
  }, [selectedItem]);

  const handleDelete = useCallback(async () => {
    if (!selectedItem) return;
    if (!repository || !primaryKeyName) {
      notify.error(t("notifications.invalidRepositoryConfig"));
      return;
    }
    const valueToDelete = selectedItem[primaryKeyName as keyof T];
    if (!valueToDelete) {
      notify.error(t("notifications.invalidPrimaryKey"), {
        description: t("notifications.missingPrimaryKeyValue"),
      });
      return;
    }
    const shouldDelete = await confirm({
      title: t("confirmations.deleteTitle"),
      description: t("confirmations.deleteDescription"),
      confirmText: t("confirmations.deleteConfirmText"),
      cancelText: t("confirmations.deleteCancelText"),
      variant: "destructive",
    });
    if (!shouldDelete) {
      notify.info(t("notifications.deleteCancelled"));
      return;
    }
    try {
      await repository.delete(valueToDelete as number);
      notify.success(t("notifications.deleteSuccess"));
      await fetchData();
      setSelectedIndex(null);
    } catch {
      notify.error(t("notifications.deleteError"));
    }
  }, [selectedItem, repository, primaryKeyName, notify, fetchData, confirm, t]);

  const handlePrint = useCallback(() => {
    notify.info(t("notifications.printReport"));
  }, [notify, t]);

  const handleClose = useCallback(() => {
    setMode("table");
  }, []);

  const handleCancel = useCallback(async () => {
    const shouldCancel = await confirm({
      title: t("confirmations.cancelTitle"),
      description: t("confirmations.cancelDescription"),
      confirmText: t("confirmations.cancelConfirmText"),
      cancelText: t("confirmations.cancelCancelText"),
      variant: "destructive",
    });
    if (shouldCancel) setMode("table");
  }, [confirm, t]);

  const handleSave = useCallback(async () => {
    if (!repository) {
      notify.error(t("notifications.invalidRepositoryConfig"));
      return;
    }
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
      const isCreating = mode === "new" || mode === "clone";
      if (mode === "view") await repository.update(formData);
      if (isCreating) await repository.save(formData);
      await fetchData();
      notify.success(t("notifications.savingSuccess"));
      setMode("table");
    } catch {
      notify.error(t("notifications.savingError"));
    }
  }, [formData, repository, fetchData, mode, validate, notify, confirm, t]);

  const handleRegisterChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      setSelectedIndex(null);
      setCurrentPage((previousPage) => {
        const maxPage = Math.max(CRUD_DEFAULT_PAGE, pageCount);
        const clampedPage = Math.min(
          Math.max(nextPage, CRUD_DEFAULT_PAGE),
          maxPage,
        );

        if (clampedPage === previousPage) {
          return previousPage;
        }

        return clampedPage;
      });
    },
    [pageCount],
  );

  const showTable = mode === "table";
  const isFormValid = validate ? validate(formData) : true;

  return {
    loadingDetail,
    mode,
    selectedIndex,
    searchValue,
    setSearchValue,
    formData,
    data,
    loading,
    filteredTableData,
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
      view: handleView,
      new: handleNew,
      clone: handleClone,
      delete: handleDelete,
      print: handlePrint,
      close: handleClose,
      cancel: handleCancel,
      save: handleSave,
      registerChange: handleRegisterChange,
      pageChange: handlePageChange,
    },
  };
}
