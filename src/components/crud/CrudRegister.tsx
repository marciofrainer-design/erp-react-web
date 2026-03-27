import { Button } from "../ui/button";
import type { CrudRegisterProps } from "./types";

const CrudRegister = <T extends object>({
  children,
  onSubmit,
  onCancel,
}: CrudRegisterProps<T>) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <div className="flex gap-2 pt-2">
          <Button type="submit" className="mt-2">
            Salvar
          </Button>
          {onCancel && (
            <Button type="button" onClick={onCancel} className="mt-2">
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CrudRegister;
