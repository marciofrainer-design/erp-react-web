import type { InputGroupBaseProps } from "./types";

const InputGroupBase = ({ children, width, height }: InputGroupBaseProps) => {
  const widthClass = width ? `w-${width}` : "w-full";
  const heightClass = height ? `h-${height}` : "h-auto";

  const classNameClass = `w-full bg-surface-container-lowest rounded-md pr-4 focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/60 outline-none h-21 mb-2 border-none placeholder:text-base ${widthClass} ${heightClass}`;

  return <div className={classNameClass}>{children}</div>;
};

export { InputGroupBase };
