import { Grid } from "lucide-react";

const ToolButtonMenuOpen: React.FC<{
  isOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}> = ({ isOpen, setIsMenuOpen }) => {
  return (
    <button
      onClick={() => setIsMenuOpen(!isOpen)}
      className="p-2 rounded-lg transition-colors"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border-secondary)",
        color: "var(--color-text-primary)",
      }}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      title="Abrir menu de ferramentas"
      type="button"
    >
      <span className="sr-only">Menu</span>
      <Grid className="w-5 h-5" />
    </button>
  );
};

export default ToolButtonMenuOpen;
