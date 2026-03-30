import { ToolsPage } from "./pages/tools/ToolsPage";
import { ThemeProvider } from "./context/theme/ThemeProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider>
      <ToolsPage />
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  );
}

export default App;
