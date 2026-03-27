const CrudContainer = ({ children }: { children: React.ReactNode }) => {
  return (
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--color-border-primary)" }}
      >
        {children}
      </div>  )
}

export default CrudContainer;
