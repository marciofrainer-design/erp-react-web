import CrudContainer from "./CrudContainer";
import type { CrudPageTemplateProps } from "./types";
import { motion } from "motion/react";
import SelectEmpresa from "../domain/selectEmpresa/SelectEmpresa";

export function CrudPageTemplate({
  title,
  pageDescription,
  search,
  table,
  register,
  footer,
  showTable = true,
}: CrudPageTemplateProps) {

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden px-8 pt-8 pb-4 max-w-480 mx-auto w-full"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderBottom: "1px solid var(--color-border-primary)",
      }}
    >
      {showTable ? (
        <motion.div>
          <CrudContainer>
            <div>
              <h1 className="text-3xl font-black font-headline tracking-tighter text-on-surface">
                {title}
              </h1>
              <p className="text-on-surface-variant text-sm mt-1">
                {pageDescription || ""}
              </p>
            </div>
            <SelectEmpresa onSelect={(value) => console.log(`Selected value: ${value}`)}  />
          </CrudContainer>

          {search && <CrudContainer>{search}</CrudContainer>}
          {table && <CrudContainer>{table}</CrudContainer>}
          {/* {actions && <CrudContainer>{actions}</CrudContainer>} */}
        </motion.div>
      ) : (
        <motion.div>
        <CrudContainer>
          <h1>{title}</h1>
          {pageDescription && (
            <p className="text-sm text-gray-500">{pageDescription}</p>
          )}
        </CrudContainer>
        <CrudContainer>{register}</CrudContainer>
        </motion.div>
      )}
      {footer && <CrudContainer>{footer}</CrudContainer>}
    </div>
  );
}
