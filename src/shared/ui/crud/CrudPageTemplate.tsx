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
      className="px-6 py-3 shadow-md flex flex-col gap-4 h-182 mx-auto max-w-4xl rounded-lg"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderBottom: "1px solid var(--color-border-primary)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--color-border-primary)" }}
      >
        <h1
          className="text-3xl font-semibold"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {title}
        </h1>
      </div>

      {/* Company Select */}
      {company && (
        <div
          className="px-4 py-2 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--color-border-primary)" }}
        >
          {company}
        </div>
      )}

      {/* Search */}
      {search && (
        <div
          className="p-3"
          style={{ borderBottom: "1px solid var(--color-border-primary)" }}
        >
          {search}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-3">
        {showTable ? table : register}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className="p-2"
          style={{ borderTop: "1px solid var(--color-border-primary)" }}
        >
          {footer}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div
          className="p-3"
          style={{ borderTop: "1px solid var(--color-border-primary)" }}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
