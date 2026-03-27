import { useMemo, useState, useCallback } from "react";
import type { CrudPageProps } from "@/components/crud/types";
import { CrudPageTemplate } from "./CrudPageTemplate";
import { CrudSearch } from "./CrudSearch";
import { CrudTable } from "./CrudTable";
import { CrudToolbar } from "./CrudToolbar";
import { motion } from "motion/react";

type CrudMode = "table" | "view" | "new" | "clone";

function CrudPage<T extends object>({
  title,
  pageDescription,
  tableColumns,
  tableData,
  register,
  dependencies,
}: CrudPageProps<T>) {
  const [mode, setMode] = useState<CrudMode>("table");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<T>>({});
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
      setMode("view");
    },
    [],
  );

  const handleView = useCallback(() => {
    if (!selectedItem) return;
    setFormData({ ...selectedItem });
    setMode("view");
  }, [selectedItem]);

  const handleNew = useCallback(() => {
    setSelectedIndex(null);
    setFormData({});
    setMode("new");
  }, []);

  const handleClone = useCallback(() => {
    if (!selectedItem) return;
    setFormData({ ...selectedItem });
    setMode("clone");
  }, [selectedItem]);

  const handleDelete = useCallback(() => {
    if (selectedIndex === null) return;
    repository?.delete?.(tableData[selectedIndex]?.[primaryKeyName as keyof T] as number | string);
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

  const handleSave = useCallback(() => {
    repository?.save(formData as T);
    setMode("table");
  }, [formData, repository]);

  const showTable = mode === "table";

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
          />
        }
        register={register}
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
