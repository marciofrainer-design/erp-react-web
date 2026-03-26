import { X } from "lucide-react";
import { toolIcons, toolLabels, type ToolKey } from "./toolConfig";

type ToolMenuModalProps = {
  isOpen: boolean;
  selectedTool: ToolKey;
  onSelectTool: (tool: ToolKey) => void;
  onClose: () => void;
};

export function ToolMenuModal({ isOpen, selectedTool, onSelectTool, onClose }: ToolMenuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Ferramentas</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(Object.keys(toolLabels) as ToolKey[]).map((tool) => {
            const IconComponent = toolIcons[tool];
            return (
              <button
                key={tool}
                onClick={() => onSelectTool(tool)}
                className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                style={{
                  backgroundColor:
                    selectedTool === tool
                      ? "var(--color-button-bg)"
                      : "var(--color-bg-secondary)",
                  color:
                    selectedTool === tool
                      ? "var(--color-button-text)"
                      : "var(--color-text-primary)",
                }}
              >
                <IconComponent className="w-8 h-8 mb-2" />
                <span className="text-sm text-center">{toolLabels[tool]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
