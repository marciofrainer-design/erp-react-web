import { ToolsPage } from "./pages/tools/ToolsPage";
import { ThemeProvider } from "./context/theme/ThemeProvider";
import { EmpresaProvider } from "./context/empresa/EmpresaProvider";
import { AuthProvider } from "./context/auth/AuthProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmpresaProvider>
          <ToolsPage />
          <Toaster position="top-right" richColors closeButton />
        </EmpresaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
