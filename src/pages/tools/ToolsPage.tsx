import { motion } from "motion/react";
import ToolHeader from "./ToolHeader";
import ToolLogin from "./ToolLogin";
import ToolFooter from "./ToolFooter";
import ToolSearch from "./ToolSearch";
import SelectEmpresa from "@/components/domain/selectEmpresa/SelectEmpresa";
import { useToolsPage } from "./useToolsPage";

export function ToolsPage() {
  const {
    t,
    isLoading,
    selectedTool,
    selectedForm,
    empresaId,
    setEmpresaId,
    isMenuOpen,
    setIsMenuOpen,
    messages,
    isConnected,
    dismiss,
    renderedComponent,
    handleSelectForm,
    handleToolSelect,
    handleOnLoginClick,
    toolTitle,
    isEmpresaDisabled,
  } = useToolsPage();

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
      <div className="p-1 flex flex-col">
        <ToolHeader
          title={t("app.name", { ns: "common" })}
          isMenuOpen={isMenuOpen}
          selectedTool={selectedTool}
          onSelectTool={handleToolSelect}
          onCloseMenu={() => setIsMenuOpen(false)}
          setIsMenuOpen={setIsMenuOpen}
          showTitle={selectedTool !== "login"}
        />
        {selectedTool !== "login" && (
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-row justify-center gap-6 items-end">
              <SelectEmpresa
                onSelect={setEmpresaId}
                value={empresaId}
                disabled={isEmpresaDisabled}
              />
              {selectedTool === "app45" && empresaId ? (
                <ToolSearch
                  selectedForm={selectedForm}
                  onSelectForm={handleSelectForm}
                />
              ) : null}
            </div>
            <div className="md:flex items-center gap-6 font-headline font-bold text-xl">
              <a
                className="text-primary mr-10 mt-2"
                href="#"
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                  color: "var(--color-text-primary)",
                }}
              >
                {toolTitle}
              </a>
            </div>
          </div>
        )}

        <div
          className="grid grid-cols-12 gap-4 mt-4"
          style={{ minHeight: "78vh" }}
        >
          <main
            className="col-span-12 rounded-lg p-1 h-full min-h-[58vh] max-h-[88vh]"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
            }}
          >
            {selectedTool === "login" ? (
              <ToolLogin isLoading={isLoading} onLoginClick={handleOnLoginClick} />
            ) : (
              <div className="overflow-hidden p-2 h-full min-h-[58vh] rounded-md">
                {renderedComponent}
              </div>
            )}
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
