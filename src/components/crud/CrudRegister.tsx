import type { CrudRegisterProps } from "./types";
import { motion } from "framer-motion";

const CrudRegister = ({
  children,
  title,
  description,
  showTitle = true,
}: CrudRegisterProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col overflow-hidden max-w-5xl mx-auto w-full h-auto"
    >
      <div >
        <div className="flex items-center justify-between">
          <div>
            {showTitle && (
              <h1 className="text-3xl font-black font-headline tracking-tighter text-on-surface">
                {title}
              </h1>
            )}
            <p className="text-on-surface-variant">
              {description && <span>{description}</span>}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl shadow-ambient pt-4 pb-4">
        <form className="space-y-8">
          {children}
        </form>
      </div>
    </motion.div>
  );
};

export default CrudRegister;
