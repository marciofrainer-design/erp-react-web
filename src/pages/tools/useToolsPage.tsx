import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToolComponent } from "./toolConfig";
import type { FormOption, ToolKey } from "./types";
import { formOptions } from "./consts";
import { ToolPlaceholder } from "./ToolPlaceholder";
import { useEmpresa } from "@/context/empresa/useEmpresa";
import { useAuth } from "@/context/auth/useAuth";
import { useFooterMessages } from "./useFooterMessages";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useNotify } from "@/hooks";
import type { CrudMode } from "@/components/crud/types";

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

export function useToolsPage(): {
  t: ReturnType<typeof useAppTranslation>["t"];
  isLoading: boolean;
  selectedTool: ToolKey;
  selectedForm: FormOption | null;
  empresaId: string | null;
  setEmpresaId: (value: string | null) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  messages: ReturnType<typeof useFooterMessages>["messages"];
  isConnected: boolean;
  dismiss: (id: string) => void;
  renderedComponent: React.ReactNode;
  handleSelectForm: (value: FormOption) => void;
  handleToolSelect: (tool: ToolKey) => void;
  handleOnLoginClick: (loginValue: string, password: string) => Promise<void>;
  toolTitle: string;
  isEmpresaDisabled: boolean;
} {
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
  const [crudMode, setCrudMode] = useState<CrudMode>("table");
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

  useEffect(() => {
    setCrudMode("table");
  }, [selectedTool, selectedForm]);

  useEffect(() => {
    if (selectedTool !== "app45" || crudMode === "table") {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedTool, crudMode]);

  const renderedComponent = useMemo(() => {
    if (selectedTool === "app45") {
      if (!selectedForm) {
        return null;
      }

      if (!empresaId) {
        return (
          <ToolPlaceholder
            label={t(`appSearch.tree.${selectedForm}`, `appSearch.tree.${selectedForm}`, {
              ns: "tools",
            })}
            description={t("page.selectCompanyPrompt", { ns: "tools" })}
          />
        );
      }
    }

    return getToolComponent({
      tool: selectedTool,
      selectedForm: selectedForm ?? undefined,
      onCrudModeChange: setCrudMode,
    });
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

  const toolTitle = useMemo(() => {
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
  }, [selectedTool, t]);

  const isEmpresaDisabled = selectedTool === "app45" && crudMode !== "table";

  return {
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
  };
}
