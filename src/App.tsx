import { ToolsPage } from "./pages/tools/ToolsPage";
import { ThemeProvider } from "./context/theme/ThemeProvider";
import { EmpresaProvider } from "./context/empresa/EmpresaProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider>
      <EmpresaProvider>
        <ToolsPage />
        <Toaster position="top-right" richColors closeButton />
      </EmpresaProvider>
    </ThemeProvider>
  );
}

export default App;
