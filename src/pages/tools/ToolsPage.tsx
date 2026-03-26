import { useMemo, useState, useCallback } from "react";
import { AndarDependenciesFactory } from "@/domain/andar/AndarDependenciesFactory";
import { getToolComponent, type ToolKey, type FormOption } from "./toolConfig";
import { ToolMenuModal } from "./ToolMenuModal";
import { ToolFormSelect } from "./ToolFormSelect";
import ToolButtonMenuOpen from "./ToolButtonMenuOpen";
import ToolButtonToggleTheme from "./ToolButtonToggleTheme";
import { EmpresaDependenciesFactory } from "@/domain/empresa/EmpresaDependenciesFactory";

export function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<ToolKey>("app45");
  const [selectedForm, setSelectedForm] = useState<FormOption>("andar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const andarDeps = useMemo(() => AndarDependenciesFactory.create(), []);
  const empresaDeps = useMemo(() => EmpresaDependenciesFactory.create(), []); 

  const renderedComponent = useMemo(() => {
    const params = { tool: selectedTool, andarDeps, empresaDeps, selectedForm };
    return getToolComponent(params);
  }, [selectedTool, andarDeps, empresaDeps, selectedForm]);

  const handleSelectForm = useCallback((value: FormOption) => {
    setSelectedForm(value);
  }, []);

  const handleToolSelect = useCallback((tool: ToolKey) => {
    setSelectedTool(tool);
    setIsMenuOpen(false);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
      }}
    >
      <ToolMenuModal
        isOpen={isMenuOpen}
        selectedTool={selectedTool}
        onSelectTool={handleToolSelect}
        onClose={() => setIsMenuOpen(false)}
      />

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <ToolButtonMenuOpen setIsMenuOpen={setIsMenuOpen} />
          <h1 className="text-3xl font-bold">Centro de Ferramentas</h1>
          <ToolButtonToggleTheme/>
        </div>

        <div className="grid grid-cols-12 gap-4" style={{ minHeight: "78vh" }}>
          <main
            className="col-span-12 rounded-lg p-2"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border-primary)",
            }}
          >
            <div
              className="p-2 h-full min-h-[58vh] rounded-md overflow-auto"
              style={{ border: "1px solid var(--color-border-primary)" }}
            >
              {selectedTool === "app45" && (
                <ToolFormSelect
                  selectedForm={selectedForm}
                  onSelectForm={handleSelectForm}
                />
              )}
              {renderedComponent}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
