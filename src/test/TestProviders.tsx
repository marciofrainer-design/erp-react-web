import type { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { ConfirmDialogProvider } from "@/context/modal/confirm/ConfirmDialogProvider";
import { EmpresaProvider } from "@/context/empresa/EmpresaProvider";
import i18n from "@/i18n";

export function TestProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfirmDialogProvider>
          <EmpresaProvider>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
          </EmpresaProvider>
        </ConfirmDialogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
