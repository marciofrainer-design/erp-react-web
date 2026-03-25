import { AndarDependenciesFactory } from "./domain/andar/AndarDependenciesFactory";
import { AndarPage } from "./domain/andar/pages/AndarPage";

function App() {
  const andarDeps = AndarDependenciesFactory.create();
  return (
    <div className="flex flex-col h-screen font-sans text-slate-300">
      <AndarPage dependencies={andarDeps} />
    </div>
  );
}

export default App;
