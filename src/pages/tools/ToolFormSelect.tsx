import { formOptions } from "./consts";
import { formLabels } from "./toolConfig";
import type { FormOption, ToolFormSelectProps } from "./types";

export function ToolFormSelect({
  selectedForm,
  onSelectForm,
}: ToolFormSelectProps) {
  const currentValue = selectedForm;

  return (
    <div
      hidden
      className="pb-3 mb-3"
      style={{ borderBottom: "1px solid var(--color-border-primary)" }}
    >
      <label className="block text-sm font-semibold mb-2" htmlFor="select-form">
        Selecionar formulário (páginas existentes)
      </label>
      <select
        id="select-form"
        className="w-full rounded-md p-2 outline-none"
        style={{
          backgroundColor: "var(--color-select-bg)",
          color: "var(--color-select-text)",
          border: "1px solid var(--color-select-border)",
        }}
        value={currentValue}
        onChange={(e) => onSelectForm(e.target.value as FormOption)}
      >
        {formOptions.map((form) => (
          <option key={form} value={form}>
            {formLabels(form)}
          </option>
        ))}
      </select>
    </div>
  );
}
