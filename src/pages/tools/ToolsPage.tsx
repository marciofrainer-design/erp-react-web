import { useMemo, useState, useCallback, useEffect } from "react";
import { getToolComponent } from "./toolConfig";
import type { FormOption, ToolKey } from "./types";
import { ToolMenuModal } from "./ToolMenuModal";
import { ToolFormSelect } from "./ToolFormSelect";
import SelectEmpresa from "@/components/domain/selectEmpresa/SelectEmpresa";
import { useEmpresa } from "@/context/empresa/useEmpresa";
import { useAuth } from "@/context/auth/useAuth";
import { motion } from "motion/react";
import ToolHeader from "./ToolHeader";
import ToolLogin from "./ToolLogin";

export function ToolsPage() {
  const { setEmpresaId, empresaId } = useEmpresa();
  const { login } = useAuth();
  const [selectedTool, setSelectedTool] = useState<ToolKey>("login");
  const [selectedForm, setSelectedForm] = useState<FormOption>("andar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

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

  const handleOnLoginClick = useCallback(
    (email: string) => {
      login(email);
      setSelectedTool("app45");
    },
    [login],
  );

  useEffect(() => {
    if (selectedTool !== "login") {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
  }, [selectedTool]);

  const getToolTitle = () => {
    switch (selectedTool) {
      case "login":
        return "Login";
      case "app45":
        return "FrontWeb 4.5";
      case "config":
        return "Configurações do Usuário";
      case "relatorios":
        return "Gerenciador de Relatórios";
      case "integracoes":
        return "Integrações";
      case "reservas":
        return "Reservas Online";
      default:
        return "Desbravador Web System";
    }
  };

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

      <div className="p-1">
        <ToolHeader
          title="Desbravador Web System"
          setIsMenuOpen={setIsMenuOpen}
          showTitle={showTitle}
        />
        {selectedTool !== "login" && (
          <div className="flex justify-between">
            <SelectEmpresa onSelect={setEmpresaId} />
            <div className="md:flex items-center gap-6 font-headline font-bold  text-xl">
              <a
                className="text-primary mr-10 mt-2"
                href="#"
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                  color: "var(--color-text-primary)",
                }}
              >
                {getToolTitle()}
              </a>
            </div>
          </div>
        )}

        <div
          className="grid grid-cols-12 gap-4 mt-4"
          style={{ minHeight: "78vh" }}
        >
          <main
            className="col-span-12 rounded-lg p-2"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
            }}
          >
            {selectedTool === "login" ? (
              <ToolLogin onLoginClick={handleOnLoginClick} />
            ) : empresaId ? (
              <div className="overflow-hidden p-2 h-full min-h-[58vh] rounded-md">
                {selectedTool === "app45" && (
                  <ToolFormSelect
                    selectedForm={selectedForm}
                    onSelectForm={handleSelectForm}
                  />
                )}
                {renderedComponent}
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </motion.div>
  );
}
