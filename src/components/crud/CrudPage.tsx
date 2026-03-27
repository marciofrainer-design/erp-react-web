import { useMemo, useState, useCallback } from "react";
import type { CrudPageProps } from "@/components/crud/types";
import { CrudPageTemplate } from "./CrudPageTemplate";
import { CrudSearch } from "./CrudSearch";
import { CrudTable } from "./CrudTable";
import { CrudToolbar } from "./CrudToolbar";
import SelectEmpresa from "@/components/domain/selectEmpresa/SelectEmpresa";

type CrudMode = "table" | "view" | "new" | "clone";

function CrudPage<T extends object>({
  title,
  tableColumns,
  tableData,
  register,
}: CrudPageProps<T>) {
  const [mode, setMode] = useState<CrudMode>("table");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<T>>({});

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
    alert(`Excluir item ${selectedIndex + 1}`);
  }, [selectedIndex]);

  const handlePrint = useCallback(() => {
    alert("Imprimir relatório");
  }, []);

  const handleClose = useCallback(() => {
    setMode("table");
  }, []);

  const showTable = mode === "table";

  const hiddenFormData = JSON.stringify({ mode, formData, selectedIndex });

  return (
    <>
      <CrudPageTemplate
        title={title}
        company={<SelectEmpresa />}
        search={<CrudSearch value="" onChange={() => {}} onSearch={() => {}} />}
        table={
          <CrudTable
            columns={tableColumns}
            data={tableData}
            selectedIndex={selectedIndex}
            onRowClick={handleRowClick}
          />
        }
        register={register}
        showTable={showTable}
        actions={
          <CrudToolbar
            onView={handleView}
            onNew={handleNew}
            onClone={handleClone}
            onDelete={handleDelete}
            onPrint={handlePrint}
            onClose={handleClose}
            hasSelected={selectedIndex !== null}
          />
        }
      />
      <div className="sr-only" aria-hidden="true">
        {hiddenFormData}
      </div>
    </>
  );
}

export { CrudPage };
