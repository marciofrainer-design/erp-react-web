import { useMemo, useState, useCallback } from "react";
import { getToolComponent } from "./toolConfig";
import type { FormOption, ToolKey } from "./types";
import { ToolMenuModal } from "./ToolMenuModal";
import { ToolFormSelect } from "./ToolFormSelect";
import SelectEmpresa from "@/components/domain/selectEmpresa/SelectEmpresa";
import { useEmpresa } from "@/context/empresa/useEmpresa";
import { motion } from "motion/react";
import ToolHeader from "./ToolHeader";

export function ToolsPage() {
  const { setEmpresaId } = useEmpresa();
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col overflow-hidden w-full"
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

      <div className="p-4">
        <ToolHeader title="Desbravador Software" setIsMenuOpen={setIsMenuOpen} />

        <div
          className="grid grid-cols-12 gap-4 mt-4"
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
              <SelectEmpresa onSelect={setEmpresaId} />
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
    </motion.div>
  );
}
