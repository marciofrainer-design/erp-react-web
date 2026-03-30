import { useMemo, useState, useCallback } from "react";
import { getToolComponent } from "./toolConfig";
import type { FormOption, ToolKey } from "./types";
import { ToolMenuModal } from "./ToolMenuModal";
import { ToolFormSelect } from "./ToolFormSelect";
import ToolButtonMenuOpen from "./ToolButtonMenuOpen";
import ToolButtonToggleTheme from "./ToolButtonToggleTheme";
import SelectEmpresa from "@/components/domain/selectEmpresa/SelectEmpresa";

export function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<ToolKey>("app45");
  const [selectedForm, setSelectedForm] = useState<FormOption>("andar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderedComponent = useMemo(() => {
    const params = { tool: selectedTool, selectedForm };
    return getToolComponent(params);
  }, [selectedTool, selectedForm]);

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

      <div className="max-w-7xl mx-auto p-4" >
        <div
          className="flex items-center justify-between mb-6 border border-indigo-300 rounded-lg p-3"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          <ToolButtonMenuOpen setIsMenuOpen={setIsMenuOpen} />
          <h1 className="text-3xl font-bold">Desbravador Software</h1>
          <ToolButtonToggleTheme />
        </div>

        <div
          className="grid grid-cols-12 gap-4 border border-indigo-300 rounded-lg "
          style={{ minHeight: "78vh" }}
        >
          <main
            className="col-span-12 rounded-lg p-2"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border-primary)",
            }}
          >
            <div
              className="overflow-hidden p-2 h-full min-h-[58vh] rounded-md"
              style={{ border: "1px solid var(--color-border-primary)" }}
            >
              <SelectEmpresa onSelect={(value) => console.log(`Selected company: ${value}`)} />
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
