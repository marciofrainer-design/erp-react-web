const EMPRESA_STORAGE_KEY = "selected-empresa-id";

let selectedEmpresaId: string | null = null;

export function setSelectedEmpresaId(value: string | null) {
  selectedEmpresaId = value;

  if (typeof window !== "undefined") {
    if (value) {
      localStorage.setItem(EMPRESA_STORAGE_KEY, value);
    } else {
      localStorage.removeItem(EMPRESA_STORAGE_KEY);
    }
  }
}

export function getSelectedEmpresaId(): string | null {
  if (selectedEmpresaId) {
    return selectedEmpresaId;
  }

  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem(EMPRESA_STORAGE_KEY);
    if (savedValue) {
      selectedEmpresaId = savedValue;
      return savedValue;
    }
  }

  return null;
}
