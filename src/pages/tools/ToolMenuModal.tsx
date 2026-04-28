import { useEffect, useRef } from "react";
import { toolIcons, toolLabels } from "./consts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import type { ToolKey } from "./types";

type ToolMenuModalProps = {
  isOpen: boolean;
  selectedTool: ToolKey;
  onSelectTool: (tool: ToolKey) => void;
  onClose: () => void;
};

export function ToolMenuModal({ isOpen, selectedTool, onSelectTool, onClose }: ToolMenuModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Card
      ref={rootRef}
      className="absolute top-full right-0 z-30 mt-2 w-88 border-border/80 bg-background/95 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/75"
    >
      <CardHeader className="pb-2">
        <CardTitle>Ferramentas</CardTitle>
        <p className="text-xs text-muted-foreground">
          Selecione o módulo que deseja abrir.
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 pt-0">
          {(Object.keys(toolLabels) as ToolKey[]).map((tool) => {
            const IconComponent = toolIcons[tool];
            const isSelected = selectedTool === tool;

            return (
              <button
                key={tool}
                onClick={() => onSelectTool(tool)}
                className={cn(
                  "flex min-h-28 flex-col items-center justify-center rounded-xl border px-4 py-4 text-center transition-colors",
                  isSelected
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/70 bg-surface-container-low text-foreground hover:border-primary/40 hover:bg-accent/60",
                )}
                type="button"
              >
                <IconComponent className="w-8 h-8 mb-2" />
                <span className="text-sm text-center">{toolLabels[tool]}</span>
              </button>
            );
          })}
      </CardContent>
    </Card>
  );
}
