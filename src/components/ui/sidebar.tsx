import React, { useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Context ──────────────────────────────────────────────── */

type SidebarContextValue = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

/* ─── Provider ─────────────────────────────────────────────── */

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="flex h-screen w-full overflow-hidden">{children}</div>
    </SidebarContext.Provider>
  );
}

/* ─── Root Sidebar ──────────────────────────────────────────── */

export function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  const { collapsed } = useSidebar();
  return (
    <aside
      className={cn(
        "relative flex flex-col shrink-0 h-full transition-all duration-300 ease-in-out",
        "border-r border-border/60",
        "bg-sidebar",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {children}
    </aside>
  );
}

/* ─── Header ────────────────────────────────────────────────── */

export function SidebarHeader({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center px-3 py-4 border-b border-border/40", className)}>
      {children}
    </div>
  );
}

/* ─── Content ───────────────────────────────────────────────── */

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-1 overflow-y-auto overflow-x-hidden py-2", className)}>{children}</div>;
}

/* ─── Footer ────────────────────────────────────────────────── */

export function SidebarFooter({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border-t border-border/40 px-3 py-3", className)}>
      {children}
    </div>
  );
}

/* ─── Group ─────────────────────────────────────────────────── */

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-1", className)}>{children}</div>;
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  const { collapsed } = useSidebar();
  if (collapsed) return null;
  return (
    <p className={cn("px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60", className)}>
      {children}
    </p>
  );
}

/* ─── Menu ──────────────────────────────────────────────────── */

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn("space-y-0.5 px-2", className)}>{children}</ul>;
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn("", className)}>{children}</li>;
}

type SidebarMenuButtonProps = {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
};

export function SidebarMenuButton({ isActive, children, onClick, className, tooltip }: SidebarMenuButtonProps) {
  const { collapsed } = useSidebar();
  return (
    <button
      type="button"
      title={collapsed ? tooltip : undefined}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
        "hover:bg-muted/80 hover:text-foreground",
        isActive
          ? "bg-primary/10 text-primary border-l-2 border-primary font-semibold"
          : "text-muted-foreground border-l-2 border-transparent",
        collapsed && "justify-center px-2",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ─── Toggle Button ─────────────────────────────────────────── */

export function SidebarTrigger({ className }: { className?: string }) {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <button
      type="button"
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        "absolute -right-3 top-6 z-10 flex size-6 items-center justify-center rounded-full",
        "border border-border bg-background shadow-sm hover:bg-muted transition-colors",
        className,
      )}
    >
      {collapsed ? (
        <ChevronRight className="size-3 text-muted-foreground" />
      ) : (
        <ChevronLeft className="size-3 text-muted-foreground" />
      )}
    </button>
  );
}

/* ─── Inset (main content area) ─────────────────────────────── */

export function SidebarInset({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={cn("flex-1 flex flex-col overflow-hidden", className)}>{children}</main>;
}
