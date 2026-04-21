import { CirclePlus, CircleX, Info, Pencil, Trash2 } from "lucide-react";
import { ButtonBase } from "@/components/button/ButtonBase";
import { CrudTable } from "@/components/crud/CrudTable";
import { CrudSearch } from "@/components/crud/CrudSearch";
import { useCrudDetail } from "@/hooks/useCrudDetail";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { Loading } from "@/components/loading/Loading";
import type { CrudDetailSectionProps } from "./types";

function CrudDetailSection<T extends object, TList extends object = T>({
  repository,
  columns,
  parentIdField,
  parentId,
  primaryKeyName,
  createBlankItem,
  validate,
  register,
  emptyMessage,
}: CrudDetailSectionProps<T, TList>) {
  const { t } = useAppTranslation("crud");

  const {
    mode,
    selectedIndex,
    searchValue,
    setSearchValue,
    formData,
    loading,
    filteredData,
    selectedItem,
    showTable,
    isFormValid,
    currentPage,
    pageCount,
    totalRows,
    handlers,
  } = useCrudDetail<T, TList>({
    repository,
    parentIdField,
    parentId,
    primaryKeyName,
    createBlankItem,
    validate,
  });

  if (loading) {
    return (
      <Loading
        variant="inline"
        size="sm"
        title={t("notifications.loadingData", { defaultValue: "Carregando..." })}
        className="min-h-32"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar do detalhe */}
      <div className="flex items-center justify-between px-1 py-2 border-b border-outline-variant/10">
        <div className="flex items-center gap-2">
          {showTable ? (
            <>
              <ButtonBase onClick={handlers.new} Icon={CirclePlus} label={t("actions.new")} />
              <ButtonBase onClick={handlers.edit} disabled={!selectedItem} Icon={Pencil} label={t("actions.view")} />
              <ButtonBase onClick={handlers.delete} disabled={!selectedItem} Icon={Trash2} label={t("actions.delete")} />
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <Info className={`w-4 h-4 ${isFormValid ? "text-primary" : "text-destructive"}`} />
              <span className="font-medium">
                {isFormValid
                  ? t("notifications.formValid")
                  : t("notifications.formInvalid")}
              </span>
            </div>
          )}
        </div>
        {!showTable && (
          <div className="flex items-center gap-2">
            <ButtonBase onClick={handlers.cancel} Icon={CircleX} label={t("actions.cancel")} />
            <ButtonBase onClick={handlers.save} disabled={!isFormValid} Icon={CirclePlus} label={t("actions.save")} />
          </div>
        )}
      </div>

      {showTable ? (
        <>
          <CrudSearch
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handlers.search}
            onClear={handlers.clearSearch}
          />
          {filteredData.length === 0 ? (
            <div className="py-8 text-center text-sm text-outline">
              {emptyMessage ?? t("table.noResults", { defaultValue: "Nenhum registro encontrado." })}
            </div>
          ) : (
            <CrudTable
              columns={columns}
              data={filteredData}
              onRowClick={handlers.rowClick}
              onRowDblClick={handlers.rowDblClick}
              indexSelected={selectedIndex}
              rowsCount={filteredData.length}
              totalRowsCount={totalRows}
              currentPage={currentPage}
              totalPageCount={pageCount}
              onPageChange={handlers.pageChange}
            />
          )}
        </>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient pt-4 pb-4">
          <form className="space-y-6">
            {register({
              mode: mode as "new" | "edit",
              data: formData,
              onChange: handlers.registerChange,
            })}
          </form>
        </div>
      )}
    </div>
  );
}

export default CrudDetailSection;
