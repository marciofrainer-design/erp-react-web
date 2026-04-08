import { ThemeProvider } from "./context/theme/ThemeProvider";
import { EmpresaProvider } from "./context/empresa/EmpresaProvider";
import { AuthProvider } from "./context/auth/AuthProvider";
import { ConfirmDialogProvider } from "./context/modal/confirm";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "sonner";
import i18n from "./i18n";
import { AppRouter } from "@/app/router";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfirmDialogProvider>
          <EmpresaProvider>
            <I18nextProvider i18n={i18n}>
              <AppRouter />
              <Toaster position="top-center" richColors closeButton />
            </I18nextProvider>
          </EmpresaProvider>
        </ConfirmDialogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
