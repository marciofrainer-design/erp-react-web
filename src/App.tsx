import { AndarDependenciesFactory } from "./domain/andar/AndarDependenciesFactory";
import { AndarPage } from "./pages/andar/AndarPage";

function App() {
  const andarDeps = AndarDependenciesFactory.create();
  return (
    <div className="flex items-center justify-center min-h-screen font-sans text-slate-300">
      <AndarPage dependencies={andarDeps} />
    </div>
  );
}

export default App;
