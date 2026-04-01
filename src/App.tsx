import { ToolsPage } from "./pages/tools/ToolsPage";
import { ThemeProvider } from "./context/theme/ThemeProvider";
import { EmpresaProvider } from "./context/empresa/EmpresaProvider";
import { AuthProvider } from "./context/auth/AuthProvider";
import { ConfirmDialogProvider } from "./context/modal/ConfirmDialogProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfirmDialogProvider>
          <EmpresaProvider>
            <ToolsPage />
            <Toaster position="top-center" richColors closeButton />
          </EmpresaProvider>
        </ConfirmDialogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
