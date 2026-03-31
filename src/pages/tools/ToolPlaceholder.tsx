export function ToolPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="h-full p-4"
      style={{ color: "var(--color-text-secondary)" }}
    >
      <h2 className="text-2xl font-semibold mb-3">{label}</h2>
      <p>Este serviço ainda não está implementado.</p>
    </div>
  );
}
