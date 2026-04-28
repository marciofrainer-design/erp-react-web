import { motion, AnimatePresence } from "motion/react";
import ToolLogin from "./ToolLogin";
import ToolFooter from "./ToolFooter";
import ToolSearch from "./ToolSearch";
import SelectEmpresa from "../../components/domain/selectEmpresa/SelectEmpresa";
import { useToolsPage } from "./useToolsPage";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "../../components/ui/sidebar";
import {
  BedDouble,
  Building2,
  CalendarCheck2,
  CalendarRange,
  Layers3,
  LayoutDashboard,
  LogOut,
  Star,
  Users,
} from "lucide-react";
import type { FormOption } from "./types";
import { useAuth } from "../../context/auth/useAuth";
import ToolButtonToggleTheme from "./ToolButtonToggleTheme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "../../lib/utils";

/* ─── Nav item definition ────────────────────────────────────── */
type NavItem = {
  label: string;
  formOption: FormOption;
  icon: React.ComponentType<{ className?: string }>;
  group?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",       formOption: "uh",              icon: LayoutDashboard, group: "Visão Geral" },
  { label: "Hóspedes",        formOption: "hospedes",        icon: Users,           group: "Operacional" },
  { label: "Reservas",        formOption: "reservas",        icon: CalendarRange,   group: "Operacional" },
  { label: "Check-in/out",    formOption: "checkin",         icon: CalendarCheck2,  group: "Operacional" },
  { label: "UH",              formOption: "uh",              icon: BedDouble,       group: "Infraestrutura" },
  { label: "Andar",           formOption: "floor",           icon: Layers3,         group: "Infraestrutura" },
  { label: "Classificação UH",formOption: "uhclassificacao", icon: Star,            group: "Infraestrutura" },
  { label: "Edificação",      formOption: "edificacao",      icon: Building2,       group: "Infraestrutura" },
];

const GROUPS = ["Visão Geral", "Operacional", "Infraestrutura"];

/* ─── Sidebar nav ───────────────────────────────────────────── */
function AppSidebar({
  selectedForm,
  onSelectForm,
  empresaId,
  setEmpresaId,
  isEmpresaDisabled,
}: {
  selectedForm: FormOption | null;
  onSelectForm: (f: FormOption) => void;
  empresaId: string | null;
  setEmpresaId: (v: string | null) => void;
  isEmpresaDisabled: boolean;
}) {
  const { collapsed } = useSidebar();
  const { user, logout } = useAuth();

  return (
    <Sidebar>
      <SidebarTrigger />

      {/* Logo area */}
      <SidebarHeader className={cn("gap-2", collapsed ? "justify-center" : "")}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="size-8 shrink-0 rounded-lg bg-primary flex items-center justify-center">
            <BedDouble className="size-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight text-foreground truncate">Hotel System</p>
              <p className="text-xs text-muted-foreground truncate">Gestão Hoteleira</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Empresa selector */}
      {!collapsed && (
        <div className="px-3 py-2 border-b border-border/40">
          <SelectEmpresa
            onSelect={setEmpresaId}
            value={empresaId}
            disabled={isEmpresaDisabled}
          />
        </div>
      )}

      {/* Navigation */}
      <SidebarContent>
        {GROUPS.map((group) => {
          const items = NAV_ITEMS.filter((item) => item.group === group);
          return (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = selectedForm === item.formOption && item.label !== "Dashboard";
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => onSelectForm(item.formOption)}
                        tooltip={item.label}
                      >
                        <Icon className="size-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      {/* Footer: user info + logout */}
      <SidebarFooter>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between gap-2")}>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{user?.nmusuario ?? "Usuário"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.login}</p>
            </div>
          )}
          <button
            type="button"
            onClick={logout}
            title="Sair"
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive transition-colors shrink-0"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

/* ─── Main page ─────────────────────────────────────────────── */
export function ToolsPage() {
  const {
    isLoading,
    selectedTool,
    selectedForm,
    empresaId,
    setEmpresaId,
    messages,
    isConnected,
    dismiss,
    renderedComponent,
    handleSelectForm,
    handleOnLoginClick,
    toolTitle,
    isEmpresaDisabled,
  } = useToolsPage();

  const isLoginPage = selectedTool === "login";

  if (isLoginPage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen w-full"
        style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}
      >
        <ToolLogin isLoading={isLoading} onLoginClick={handleOnLoginClick} />
      </motion.div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar
        selectedForm={selectedForm}
        onSelectForm={handleSelectForm}
        empresaId={empresaId}
        setEmpresaId={setEmpresaId}
        isEmpresaDisabled={isEmpresaDisabled}
      />

      <SidebarInset>
        {/* Top header bar */}
        <header
          className="flex items-center justify-between px-4 py-2 border-b border-border/50 shrink-0"
          style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
          <div className="flex items-center gap-3">
            {selectedForm && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedForm}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-muted-foreground text-sm">Hotel System</span>
                  <span className="text-muted-foreground/40 text-sm">/</span>
                  <span className="text-sm font-semibold text-foreground">{toolTitle}</span>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedTool === "app45" && empresaId && (
              <ToolSearch selectedForm={selectedForm} onSelectForm={handleSelectForm} />
            )}
            <LanguageSwitcher />
            <ToolButtonToggleTheme />
          </div>
        </header>

        {/* Content */}
        <div
          className="flex-1 overflow-hidden"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedForm ?? "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full p-3 overflow-hidden"
            >
              {renderedComponent}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        {selectedTool === "app45" && (
          <ToolFooter messages={messages} isConnected={isConnected} onDismiss={dismiss} />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
