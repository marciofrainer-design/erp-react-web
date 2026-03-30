import { useMemo, useState, useCallback } from "react";
import type { CrudMode, CrudPageProps } from "@/components/crud/types";
import { CrudPageTemplate } from "./CrudPageTemplate";
import { CrudSearch } from "./CrudSearch";
import { CrudTable } from "./CrudTable";
import { CrudToolbar } from "./CrudToolbar";
import { motion } from "motion/react";

function CrudPage<T extends object>({
  title,
  pageDescription,
  tableColumns,
  tableData,
  register,
  createNewItem,
  onSaved,
  dependencies,
  validate,
}: CrudPageProps<T>) {
  const [mode, setMode] = useState<CrudMode>("table");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<T>(
    () => createNewItem?.() ?? ({} as T),
  );
  const { repository, primaryKeyName } = dependencies || {};

  const selectedItem = useMemo(() => {
    return selectedIndex !== null ? tableData[selectedIndex] : null;
  }, [selectedIndex, tableData]);

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
      setFormData({ ...tableData[index] });
      setMode("view");
    },
    [tableData],
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

  const handleDelete = useCallback(() => {
    if (selectedIndex === null) return;
    repository?.delete?.(
      tableData[selectedIndex]?.[primaryKeyName as keyof T] as number,
    );
  }, [selectedIndex, repository, tableData, primaryKeyName]);

  const handlePrint = useCallback(() => {
    alert("Imprimir relatório");
  }, []);

  const handleClose = useCallback(() => {
    setMode("table");
  }, []);

  const handleCancel = useCallback(() => {
    setMode("table");
  }, []);

  const handleSave = useCallback(async () => {
    if (!repository) return;

    if (validate && !validate(formData)) {
      return;
    }

    if (mode === "view") {
      await repository.update(formData);
    }
    if ((mode as string) === "new" || (mode as string) === "clone") {
      await repository.save(formData);
    }
    await onSaved?.();
    setMode("table");
  }, [formData, repository, onSaved, mode, validate]);

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

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CrudPageTemplate
        title={mode === "table" ? title : ""}
        pageDescription={pageDescription}
        search={<CrudSearch value="" onChange={() => {}} onSearch={() => {}} />}
        table={
          <CrudTable
            columns={tableColumns}
            data={tableData}
            onRowClick={handleRowClick}
            onRowDblClick={handleRowDblClick}
            indexSelected={selectedIndex}
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
            hasSelected={selectedIndex !== null}
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
}

export { CrudPage };
