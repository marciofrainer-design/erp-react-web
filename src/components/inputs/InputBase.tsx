import { Input } from "@components/ui/input";
import type { InputProps } from "./types";

const InputBase = ({ width, Icon, onClickIcon, ...props }: InputProps) => {
  const showTypeCursorClass = onClickIcon ? "cursor-pointer" : "cursor-default";
  const paddingTextClass = Icon ? "pr-12" : "pr-4";
  const widthClass = width ? `w-${width}` : "w-full";

  const classNameClass = props.className
    ? props.className
    : `pl-3 w-full bg-surface-container-lowest shadow-sm rounded-md ${paddingTextClass} focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/60 outline-none h-11 border-none placeholder:text-base ${widthClass} text-lg`;

  const styleObject = {
    backgroundColor: "var(--color-input-bg)",
    color: "var(--color-input-text)",
    borderColor: "var(--color-input-border)",
  };

  return (
    <div className="relative w-full ml-2">
      <Input {...props} className={classNameClass} style={styleObject} />
      {Icon && (
        <div
          className={`absolute inset-y-0 right-4 pl-4 flex items-center text-outline group-focus-within:text-primary transition-colors"`}
        >
          {Icon && (
            <Icon
              onClick={onClickIcon}
              className={`w-5 h-5 ${showTypeCursorClass}`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InputBase;
