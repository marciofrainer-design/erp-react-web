import type { CrudPageTemplateProps } from "./types"

export function CrudPageTemplate({
  title,
  company,
  search,
  table,
  footer,
  actions
}: CrudPageTemplateProps) {
  return (
    <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex-none shadow-md">

      {/* Header */}
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <h1 className="text-slate-300 text-3xl font-semibold">{title}</h1>
      </div>

      {/* Company Select */}
      {company && (
       <div className="border-b px-4 py-2 flex items-center justify-between">
        {company} 
        </div>
      )}

      {/* Search */}
      {search && (
        <div className="border-b p-3">
          {search}
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto p-3">
        {table}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t  p-2">
          {footer}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div className="border-t  p-3">
          {actions}
        </div>
      )}

    </div>
  )
}