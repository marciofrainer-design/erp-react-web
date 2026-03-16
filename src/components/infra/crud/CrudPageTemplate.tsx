import type { CrudPageTemplateProps } from "./CrudTypes"

export function CrudPageTemplate({
  title,
  company,
  search,
  table,
  footer,
  actions
}: CrudPageTemplateProps) {
  return (
    <div className="flex flex-col h-full bg-gray-100">

      {/* Header */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <h1 className="text-sky-800 text-3xl font-semibold">{title}</h1>
      </div>

      {/* Company Select */}
      {company && (
       <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        {company} 
        </div>
      )}

      {/* Search */}
      {search && (
        <div className="bg-white border-b p-3">
          {search}
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto p-3">
        {table}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t bg-white p-2">
          {footer}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div className="border-t bg-gray-50 p-3">
          {actions}
        </div>
      )}

    </div>
  )
}