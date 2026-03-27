import CrudContainer from "./CrudContainer";
import type { CrudPageTemplateProps } from "./types";

export function CrudPageTemplate({
  title,
  company,
  search,
  table,
  register,
  footer,
  actions,
  showTable = true,
}: CrudPageTemplateProps) {
  return (
    <div
      className="px-6 py-3 shadow-md flex flex-col gap-4 h-182 mx-auto max-w-5xl rounded-lg"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderBottom: "1px solid var(--color-border-primary)",
      }}
    >
      <CrudContainer>
        <h1>{title}</h1>
      </CrudContainer>

      {company && <CrudContainer>{company}</CrudContainer>}

      {search && <CrudContainer>{search}</CrudContainer>}

      <div className="flex-1 overflow-auto p-3">
        {showTable ? table : register}
      </div>

      {footer && <CrudContainer>{footer}</CrudContainer>}
      
      {actions && <CrudContainer>{actions}</CrudContainer>}
    </div>
  );
}
