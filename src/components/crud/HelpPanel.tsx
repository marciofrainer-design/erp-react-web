import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export type HelpField = {
  fieldName: string;
  title: string;
  description: string;
  example?: string;
};

type HelpPanelProps = {
  fields: HelpField[];
  activeField?: string;
};

function HelpPanelItem({ field, isActive }: { field: HelpField; isActive: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const open = isActive || expanded;

  return (
    <motion.div
      layout
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        isActive
          ? "border-primary/60 bg-primary/5 shadow-sm"
          : "border-border bg-card/50"
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`size-2 shrink-0 rounded-full ${
              isActive ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
            }`}
          />
          <span
            className={`text-sm font-semibold truncate ${
              isActive ? "text-primary" : "text-foreground/70"
            }`}
          >
            {field.title}
          </span>
        </div>
        {open ? (
          <ChevronUp className="size-3.5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {field.description}
              </p>
              {field.example && (
                <div className="rounded-md bg-muted/60 px-3 py-1.5">
                  <p className="text-xs font-mono text-muted-foreground">
                    {field.example}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HelpPanel({ fields, activeField }: HelpPanelProps) {
  return (
    <aside className="hidden xl:flex flex-col w-72 shrink-0 gap-3">
      <div className="flex items-center gap-2 px-1 mb-1">
        <BookOpen className="size-4 text-primary" />
        <span className="text-sm font-semibold text-foreground/80">Guia de Preenchimento</span>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-[70vh] pr-1 scrollbar-thin">
        {fields.map((field) => (
          <HelpPanelItem
            key={field.fieldName}
            field={field}
            isActive={activeField === field.fieldName}
          />
        ))}
      </div>
    </aside>
  );
}
