import { Building2 } from "lucide-react";
import type { CrudRegisterProps } from "./types";
import { motion } from "framer-motion";

const CrudRegister = ({
  children,
  title,
  description,
}: CrudRegisterProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col overflow-hidden max-w-5xl mx-auto w-full"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black font-headline tracking-tighter text-on-surface">
              {title}
            </h1>
            <p className="text-on-surface-variant">
              {description && <span>{description}</span>}
            </p>
          </div>
          <div className="bg-primary-fixed/30 px-4 py-2 rounded-xl flex items-center gap-3">
            <Building2 className="text-primary w-5 h-5" />
            <span className="text-sm font-semibold text-primary">
              Unidade: Matriz Central
            </span>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-8 border border-outline-variant/20">
        <form className="space-y-8">
          {children}
        </form>
      </div>
    </motion.div>
  );
};

export default CrudRegister;
