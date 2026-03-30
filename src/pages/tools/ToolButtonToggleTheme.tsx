import { useTheme } from "@/context";

const ToolButtonToggleTheme: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border-secondary)",
        color: "var(--color-text-primary)",
        opacity: 0.7,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
      }}
      title={`Mudar para modo ${mode === "light" ? "escuro" : "claro"}`}
    >
      {mode === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ToolButtonToggleTheme;
