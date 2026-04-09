import type { CrudPageProps } from "@/components/crud/types";
import { CrudPageTemplate } from "./CrudPageTemplate";
import { CrudSearch } from "./CrudSearch";
import { CrudTable } from "./CrudTable";
import { CrudToolbar } from "./CrudToolbar";
import { motion } from "motion/react";
import { Loading } from "@/components/loading/Loading";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useCrud } from "@/hooks";
import { TRANSITION_DURATION } from "./consts";
import type { EntityBase } from "@/types";

const CrudPage = <T extends EntityBase>({
  title,
  pageDescription,
  tableColumns,
  register,
  tabs,
  createNewItem,
  dependencies,
  validate,
}: CrudPageProps<T>) => {
  const { t } = useAppTranslation("crud");
  const {
    mode,
    selectedIndex,
    searchValue,
    setSearchValue,
    formData,
    loading,
    filteredTableData,
    selectedItem,
    showTable,
    isFormValid,
    currentPage,
    pageCount,
    totalRows,
    handlers,
  } = useCrud({ createNewItem, dependencies, validate });

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

  const renderProps = {
    mode: mode as "view" | "new" | "clone",
    data: formData,
    onChange: handlers.registerChange,
  };

  const registerContent = !showTable
    ? (tabs?.(renderProps) ?? register?.(renderProps))
    : undefined;

  const hiddenFormData = JSON.stringify({ mode, formData, selectedIndex });

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: TRANSITION_DURATION }}
    >
      <CrudPageTemplate
        title={mode === "table" ? title : ""}
        pageDescription={pageDescription}
        search={
          <CrudSearch
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handlers.search}
            onClear={handlers.clearSearch}
          />
        }
        table={
          <CrudTable
            columns={tableColumns}
            data={filteredTableData}
            onRowClick={handlers.rowClick}
            onRowDblClick={handlers.rowDblClick}
            indexSelected={selectedIndex}
            rowsCount={filteredTableData.length}
            totalRowsCount={totalRows}
            currentPage={currentPage}
            totalPageCount={pageCount}
            onPageChange={handlers.pageChange}
          />
        }
        register={registerContent}
        showTable={showTable}
        footer={
          <CrudToolbar
            onView={handlers.view}
            onNew={handlers.new}
            onClone={handlers.clone}
            onDelete={handlers.delete}
            onPrint={handlers.print}
            onClose={handlers.close}
            onCancel={handlers.cancel}
            onSave={handlers.save}
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
