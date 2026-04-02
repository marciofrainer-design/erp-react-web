import { User, Bell, Settings } from "lucide-react";
import ToolButtonMenuOpen from "./ToolButtonMenuOpen";
import ToolButtonToggleTheme from "./ToolButtonToggleTheme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { motion } from "motion/react";
import type { ToolHeaderProps } from "./types";

const ToolHeader = ({
  title,
  setIsMenuOpen,
  showTitle = false,
}: ToolHeaderProps) => {
  return (
    <header className="glass sticky top-0 z-50 shadow-ambient border-b border-outline-variant/10">
      <nav className="flex justify-between items-center w-full px-8 h-16">
        <motion.div
          animate={{ opacity: showTitle ? 1 : 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeInOut",
          }}
          className="flex items-center gap-8"
        >
          {showTitle && (
            <span
              className="text-2xl font-extrabold text-primary tracking-tighter font-headline"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                color: "var(--color-text-primary)",
              }}
            >
              {title}
            </span>
          )}
        </motion.div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
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
          <div className="h-8 w-8 rounded-full border border-outline-variant/20 cursor-pointer overflow-hidden items-center justify-center flex">
            <User className="w-5 h-5 object-cover" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ToolHeader;
