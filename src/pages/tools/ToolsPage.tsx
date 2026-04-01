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
import ToolFooter from "./ToolFooter";
import { useFooterMessages } from "./useFooterMessages";
import { useAppTranslation } from "@/i18n/useAppTranslation";

export function ToolsPage() {
  const { t } = useAppTranslation(["tools", "common"]);
  const { setEmpresaId, empresaId } = useEmpresa();
  const { login } = useAuth();
  const [selectedTool, setSelectedTool] = useState<ToolKey>("login");
  const [selectedForm, setSelectedForm] = useState<FormOption>("andar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const { messages, isConnected, addMessage, dismiss } = useFooterMessages();

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
      addMessage("success", t("page.welcomeMessage", { ns: "tools", email }));
    },
    [login, addMessage, t],
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
        return t("page.toolTitle.login", { ns: "tools" });
      case "app45":
        return t("page.toolTitle.app45", { ns: "tools" });
      case "config":
        return t("page.toolTitle.config", { ns: "tools" });
      case "relatorios":
        return t("page.toolTitle.relatorios", { ns: "tools" });
      case "integracoes":
        return t("page.toolTitle.integracoes", { ns: "tools" });
      case "reservas":
        return t("page.toolTitle.reservas", { ns: "tools" });
      default:
        return t("page.defaultTitle", { ns: "tools" });
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

      <div className="p-1 flex flex-col">
        <ToolHeader
          title={t("app.name", { ns: "common" })}
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
            className="col-span-12 rounded-lg p-1 h-full min-h-[58vh] max-h-[88vh] "
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
        {selectedTool === "app45" ? (
          <ToolFooter
            messages={messages}
            isConnected={isConnected}
            onDismiss={dismiss}
          />
        ) : null}
      </div>
    </motion.div>
  );
}
