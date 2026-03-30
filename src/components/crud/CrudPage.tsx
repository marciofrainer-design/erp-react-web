import { useMemo, useState, useCallback, useEffect } from "react";
import type { CrudMode, CrudPageProps } from "@/components/crud/types";
import { CrudPageTemplate } from "./CrudPageTemplate";
import { CrudSearch } from "./CrudSearch";
import { CrudTable } from "./CrudTable";
import { CrudToolbar } from "./CrudToolbar";
import { motion } from "motion/react";
import { useNotify } from "@/hooks";

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const stringifyForSearch = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.map((item) => stringifyForSearch(item)).join(" ");
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map((item) => stringifyForSearch(item))
      .join(" ");
  }

  return String(value);
};

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
  const notify = useNotify();
  const [mode, setMode] = useState<CrudMode>("table");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<T>(
    () => createNewItem?.() ?? ({} as T),
  );
  const { repository, primaryKeyName } = dependencies || {};

  const filteredTableData = useMemo(() => {
    const term = normalizeSearchText(searchTerm.trim());

    if (!term) {
      return tableData;
    }

    return tableData.filter((row) =>
      normalizeSearchText(stringifyForSearch(row)).includes(term),
    );
  }, [searchTerm, tableData]);

  const selectedItem = useMemo(() => {
    return selectedIndex !== null ? filteredTableData[selectedIndex] : null;
  }, [selectedIndex, filteredTableData]);

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
      notify.error("Configuração de repositório inválida para exclusão.");
      return;
    }

    const valueToDelete = selectedItem[primaryKeyName as keyof T];
    if (!valueToDelete) {
      notify.error(
        "Não foi possível identificar o registro para exclusão. Chave primária ausente ou inválida.",
        {
        description: `Valor da chave primária (${primaryKeyName}) não encontrado no item selecionado.`,
        },
      );
      return;
    }

    try {
      await repository.delete(valueToDelete as number);
      notify.success("Registro excluído com sucesso.");
      await onSaved?.();
      setSelectedIndex(null);
    } catch {
      notify.error("Não foi possível excluir o registro.");
    }
  }, [selectedItem, repository, primaryKeyName, notify, onSaved]);

  const handlePrint = useCallback(() => {
    notify.info("Imprimir relatório");
  }, [notify]);

  const handleClose = useCallback(() => {
    setMode("table");
  }, []);

  const handleCancel = useCallback(() => {
    setMode("table");
  }, []);

  const handleSave = useCallback(async () => {
    if (!repository) {
      notify.error("Configuração de repositório inválida para salvar.");
      return;
    }

    if (validate && !validate(formData)) {
      notify.warning("Existem erros no formulário. Revise os campos obrigatórios.");
      return;
    }

    try {
      if (mode === "view") {
        await repository.update(formData);
      }
      if ((mode as string) === "new" || (mode as string) === "clone") {
        await repository.save(formData);
      }
      await onSaved?.();
      notify.success("Registro salvo com sucesso.");
      setMode("table");
    } catch {
      notify.error("Não foi possível salvar o registro.");
    }
  }, [formData, repository, onSaved, mode, validate, notify]);

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
      transition={{duration: 2}}
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
            totalRowsCount={tableData.length}
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
}

export { CrudPage };
