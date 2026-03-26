const ToolButtonMenuOpen: React.FC<{ setIsMenuOpen: (open: boolean) => void }> = ({ setIsMenuOpen }) => {
  return (
    <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border-secondary)",
              color: "var(--color-text-primary)",
            }}
            title="Abrir menu de ferramentas"
          >
            <span className="sr-only">Menu</span>
            <span role="img" aria-label="Menu">☰</span>
          </button>
  )};

export default ToolButtonMenuOpen;