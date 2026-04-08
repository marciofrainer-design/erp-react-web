import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getToolComponent } from "./toolConfig";
import type { FormOption, ToolKey } from "./types";
import { formOptions } from "./consts";
import ToolHeader from "./ToolHeader";
import ToolLogin from "./ToolLogin";
import ToolFooter from "./ToolFooter";
import ToolSearch from "./ToolSearch";
import { ToolPlaceholder } from "./ToolPlaceholder";
import SelectEmpresa from "@/components/domain/selectEmpresa/SelectEmpresa";
import { useEmpresa } from "@/context/empresa/useEmpresa";
import { useAuth } from "@/context/auth/useAuth";
import { useFooterMessages } from "./useFooterMessages";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useNotify } from "@/hooks";

const TOOL_KEYS: ToolKey[] = [
  "login",
  "app45",
  "reservas",
  "config",
  "relatorios",
  "integracoes",
];

function isValidToolKey(value?: string): value is ToolKey {
  return Boolean(value && TOOL_KEYS.includes(value as ToolKey));
}

function isValidFormOption(value?: string): value is FormOption {
  return Boolean(value && formOptions.includes(value as FormOption));
}

export function ToolsPage() {
  const { t } = useAppTranslation(["tools", "common"]);
  const navigate = useNavigate();
  const { tool: routeTool, form: routeForm } = useParams<{
    tool?: string;
    form?: string;
  }>();

  const selectedTool: ToolKey = isValidToolKey(routeTool) ? routeTool : "login";
  const selectedForm: FormOption | null = isValidFormOption(routeForm)
    ? routeForm
    : null;

  const { setEmpresaId, empresaId } = useEmpresa();
  const { isLoading, login } = useAuth();
  const notify = useNotify();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { messages, isConnected, addMessage, dismiss } = useFooterMessages();

  useEffect(() => {
    if (!routeTool) {
      return;
    }

    if (!isValidToolKey(routeTool)) {
      navigate("/tools/login", { replace: true });
      return;
    }

    if (routeTool === "app45" && routeForm && !isValidFormOption(routeForm)) {
      navigate("/tools/app45", { replace: true });
    }
  }, [routeTool, routeForm, navigate]);

  const renderedComponent = useMemo(() => {
    if (selectedTool === "app45") {
      if (!selectedForm) {
        return null
      }

      if (!empresaId) {
        return (
          <ToolPlaceholder
            label={t(`appSearch.tree.${selectedForm}`, { ns: "tools" })}
            description={t("page.selectCompanyPrompt", { ns: "tools" })}
          />
        );
      }
    }

    return getToolComponent({ tool: selectedTool, selectedForm: selectedForm ?? undefined });
  }, [selectedTool, selectedForm, empresaId, t]);

  const handleSelectForm = useCallback(
    (value: FormOption) => {
      navigate(`/tools/app45/${value}`);
    },
    [navigate],
  );

  const handleToolSelect = useCallback(
    (tool: ToolKey) => {
      if (tool === "login") {
        navigate("/tools/login");
      } else if (tool === "app45") {
        navigate("/tools/app45");
      } else {
        navigate(`/tools/${tool}`);
      }

      setIsMenuOpen(false);
    },
    [navigate],
  );

  const handleOnLoginClick = useCallback(
    async (loginValue: string, password: string) => {
      try {
        const user = await login(loginValue, password);
        navigate("/tools/app45");
        addMessage(
          "success",
          t("page.welcomeMessage", {
            ns: "tools",
            email: user?.login ?? loginValue,
          }),
        );
      } catch {
        notify.error(t("page.invalidCredentials", { ns: "tools" }));
      }
    },
    [navigate, addMessage, notify, t, login],
  );

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
          <div className="flex justify-between">
            <div className="flex flex-row justify-center gap-6">
              <SelectEmpresa onSelect={setEmpresaId} />
              {selectedTool === "app45" && empresaId ? (
                <ToolSearch
                  selectedForm={selectedForm}
                  onSelectForm={handleSelectForm}
                />
              ) : null}
            </div>
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
