import { Bell, Search, Settings } from "lucide-react";
import ToolButtonMenuOpen from "./ToolButtonMenuOpen";
import ToolButtonToggleTheme from "./ToolButtonToggleTheme";

type ToolHeaderProps = {
  title: string;
  setIsMenuOpen: (open: boolean) => void;
};

const ToolHeader = ({ title, setIsMenuOpen }: ToolHeaderProps) => {
  return (
    <header className="glass sticky top-0 z-50 shadow-ambient border-b border-outline-variant/10">
      <nav className="flex justify-between items-center w-full px-6 h-16 max-w-480 mx-auto">
        <div className="flex items-center gap-8">
          <span
            className="text-xl font-black text-primary tracking-tighter font-headline"
            style={{
              backgroundColor: "var(--color-bg-primary)",
              color: "var(--color-text-primary)",
            }}
          >
            {title}
          </span>
          <div className="hidden md:flex items-center gap-6 font-headline font-bold tracking-tight text-sm">
            <a
              className="text-primary border-b-2 border-primary pb-1 cursor-pointer"
              href="#"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                color: "var(--color-text-primary)",
              }}
            >
              Aplicação 4.5
            </a>
            {/* <a className="text-on-surface-variant font-medium hover:text-primary hover:bg-surface-container transition-all rounded-lg px-2 py-1" href="#">Reservas Online</a>
              <a className="text-on-surface-variant font-medium hover:text-primary hover:bg-surface-container transition-all rounded-lg px-2 py-1" href="#">Configurações</a>
              <a className="text-on-surface-variant font-medium hover:text-primary hover:bg-surface-container transition-all rounded-lg px-2 py-1" href="#">Relatórios</a>
              <a className="text-on-surface-variant font-medium hover:text-primary hover:bg-surface-container transition-all rounded-lg px-2 py-1" href="#">Integrações</a> */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              className="bg-surface-container-high border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/40 w-64 transition-all outline-none"
              placeholder="Pesquisar..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <ToolButtonMenuOpen setIsMenuOpen={setIsMenuOpen} />
            <ToolButtonToggleTheme />
            <button className="p-2 text-outline hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer active:scale-95 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-2 text-outline hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer active:scale-95">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant/20 cursor-pointer active:scale-95">
            <img
              className="w-full h-full object-cover"
              src="https://picsum.photos/seed/profile/100/100"
              alt="User Profile"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ToolHeader;
