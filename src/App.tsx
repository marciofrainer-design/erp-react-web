import { ToolsPage } from "./pages/tools/ToolsPage";
import { ThemeProvider } from "./shared/context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <ToolsPage />
    </ThemeProvider>
  );
}

export default App;
