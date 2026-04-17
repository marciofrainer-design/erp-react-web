import { CirclePlus, Trash2 } from "lucide-react";
import { ButtonBase } from "@/components/button/ButtonBase";
import { SelectRepository } from "@/components/select/SelectRepository";
import { TableBase } from "@/components/table/TableBase";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import type { EntityBase } from "@/types";
import { useSelectionList } from "./useSelectionList";
import type { SelectionListProps } from "./types";

function SelectionList<T extends EntityBase>({
  repository,
  mapper,
  columns,
  primaryKeyField,
  value,
  onChange,
  allowDuplicates = false,
  label,
  addButtonLabel,
  // removeButtonLabel,
  emptyMessage,
}: SelectionListProps<T>) {
  const { t } = useAppTranslation(["components", "crud"]);

  const {
    pendingValue,
    setPendingValue,
    checkedKeys,
    canAdd,
    filterFn,
    handleAdd,
    handleToggleCheck,
    // handleRemoveChecked,
    handleRemoveRow,
  } = useSelectionList({
    repository,
    mapper,
    primaryKeyField,
    value,
    onChange,
    allowDuplicates,
  });

  const resolvedLabel =
    label ?? t("selectionList.selectLabel", { ns: "components", defaultValue: "Selecionar item" });

  const resolvedAddLabel =
    addButtonLabel ?? t("selectionList.add", { ns: "components", defaultValue: "Adicionar" });

  // const resolvedRemoveLabel =
  //   removeButtonLabel ?? t("selectionList.remove", { ns: "components", defaultValue: "Remover" });
    
  const resolvedEmptyMessage =
    emptyMessage ??
    t("selectionList.empty", { ns: "components", defaultValue: "Nenhum item adicionado." });

  return (
    <div className="flex flex-col gap-3 w-full mt-4">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <SelectRepository<T>
            repository={repository}
            mapper={mapper}
            label={resolvedLabel}
            value={pendingValue}
            onChange={setPendingValue}
            filterFn={filterFn}
          />
        </div>
        <ButtonBase
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          Icon={CirclePlus}
          label={resolvedAddLabel}
        />
      </div>

      {/* {checkedKeys.size > 0 && (
        <div className="flex justify-end">
          <ButtonBase
            type="button"
            onClick={handleRemoveChecked}
            Icon={Trash2}
            label={`${resolvedRemoveLabel} (${checkedKeys.size})`}
          />
        </div>
      )} */}

      {/* Empty state */}
      {value.length === 0 ? (
        <div className="py-8 text-center text-sm text-outline rounded-xl border border-dashed border-outline-variant/30">
          {resolvedEmptyMessage}
        </div>
      ) : (
        <div className="relative rounded-2xl shadow-ambient bg-surface-container-lowest overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20 rounded-l-2xl" />
          <TableBase<T>
            columns={columns}
            data={value}
            onRowClick={(row) => handleToggleCheck(String(row[primaryKeyField]))}
            onCellChange={(_, rowIndex, field, nextValue) => {
              const updatedItems = value.map((item, index) =>
                index === rowIndex
                  ? {
                      ...item,
                      [field]: nextValue,
                    }
                  : item,
              ) as T[];

              onChange(updatedItems);
            }}
            lastColumn={{
              footer: null,
              width: "w-8",
              cell: (row) => {
                const key = String(row[primaryKeyField]);
                return (
                  <ButtonBase
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveRow(key);
                    }}
                    Icon={Trash2}
                  />
                );
              },
            }}
            getRowClassName={(row) => {
              const key = String(row[primaryKeyField]);
              const isChecked = checkedKeys.has(key);
              return `transition-colors cursor-pointer ${
                isChecked
                  ? "bg-destructive/10 hover:bg-destructive/15"
                  : "bg-surface-container-low hover:bg-(--table-row-hover)"
              }`;
            }}
            isDetailsTable={true}
          />
        </div>
      )}
    </div>
  );
}

export default SelectionList;
