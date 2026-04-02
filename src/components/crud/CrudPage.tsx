import { useMemo, useState, useCallback, useEffect } from "react";
import type { CrudMode, CrudPageProps } from "@/components/crud/types";
import { CrudPageTemplate } from "./CrudPageTemplate";
import { CrudSearch } from "./CrudSearch";
import { CrudTable } from "./CrudTable";
import { CrudToolbar } from "./CrudToolbar";
import { motion } from "motion/react";
import { useConfirm, useNotify } from "@/hooks";
import { Loading } from "@/components/loading/Loading";
import { normalizeSearchText, stringifyForSearch } from "@/utils";
import type { AxiosError } from "axios";
import { useAppTranslation } from "@/i18n/useAppTranslation";

const CrudPage = <T extends object>({
  title,
  pageDescription,
  tableColumns,
  register,
  createNewItem,
  dependencies,
  validate,
}: CrudPageProps<T>) => {
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

  const filteredTableData = useMemo(() => {
    const term = normalizeSearchText(searchTerm.trim());

    if (!term) {
      return data;
    }

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
      const data = await repository.getAll();
      setData(data);
    } catch (err: AxiosError | unknown) {
      notify.error(
        `${t("notifications.loadingDataError")}: ${(err as AxiosError).message || err}`,
      );
    } finally {
      setLoading(false);
    }
  }, [repository, notify, t]);

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
      if (mode !== "table") {
        setMode("table");
      }
    },
    [mode],
  );

  const handleRowDblClick = useCallback(
    (_: T, index: number) => {
      setSelectedIndex(index);
      setFormData({ ...filteredTableData[index] });
      setMode("view");
    },
    [filteredTableData],
  );

  const handleView = useCallback(() => {
    if (!selectedItem) return;
    setFormData({ ...selectedItem });
    setMode("view");
  }, [selectedItem]);

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

    if (shouldCancel) {
      setMode("table");
    }
  }, [confirm, t]);

  const handleSave = useCallback(async () => {
    if (!repository) {
      notify.error(t("notifications.invalidRepositoryConfig"));
      return;
    }

    if (validate && !validate(formData)) {
      notify.warning(
        t("notifications.formInvalid"),
      );
      return;
    }

    const shouldSave = await confirm({
      title: t("confirmations.saveTitle"),
      description: t("confirmations.saveDescription"),
      confirmText: t("confirmations.saveConfirmText"),
      cancelText: t("confirmations.saveCancelText"),
      variant: "default",
    });

    if (!shouldSave) {
      return;
    }

    try {
      if (mode === "view") {
        await repository.update(formData);
      }
      if ((mode as string) === "new" || (mode as string) === "clone") {
        await repository.save(formData);
      }
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

  const showTable = mode === "table";
  const isFormValid = validate ? validate(formData) : true;

  const registerContent =
    !showTable && register
      ? register({
          mode,
          data: formData,
          onChange: handleRegisterChange,
        })
      : undefined;

  const hiddenFormData = JSON.stringify({ mode, formData, selectedIndex });

  if (loading) {
    return (
      <Loading
        variant="page"
        size="lg"
        title={t("notifications.loadingData")}
        description={t("notifications.preparingData")}
      />
    );
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <CrudPageTemplate
        title={mode === "table" ? title : ""}
        pageDescription={pageDescription}
        search={
          <CrudSearch
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
        }
        table={
          <CrudTable
            columns={tableColumns}
            data={filteredTableData}
            onRowClick={handleRowClick}
            onRowDblClick={handleRowDblClick}
            indexSelected={selectedIndex}
            rowsCount={filteredTableData.length}
            totalRowsCount={data.length}
          />
        }
        register={registerContent}
        showTable={showTable}
        footer={
          <CrudToolbar
            onView={handleView}
            onNew={handleNew}
            onClone={handleClone}
            onDelete={handleDelete}
            onPrint={handlePrint}
            onClose={handleClose}
            onCancel={handleCancel}
            onSave={handleSave}
            hasSelected={selectedItem !== null}
            showTable={showTable}
            isFormValid={isFormValid}
          />
        }
      />
      <div className="sr-only" aria-hidden="true">
        {hiddenFormData}
      </div>
    </motion.div>
  );
};

export default CrudPage;
