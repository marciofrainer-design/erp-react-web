import { Button } from "@/components/ui/button";
import type { ButtonBaseProps } from "./types";

const ButtonBase = ({
  disabled,
  onClick,
  Icon,
  label,
  hidden,
  className,
  ...props
}: ButtonBaseProps) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ? ${className} : flex items-center gap-2 px-6 py-2.5 indigo-gradient text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 cursor-pointer ${hidden ? "hidden" : ""}`}
      style={{
        backgroundColor: "var(--color-button-bg)",
        color: "var(--color-button-text)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--color-button-bg-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--color-button-bg)";
      }}
    >
      {Icon && <Icon className="w-6 h-6" />}
      <span className="text-md">{label}</span>
    </Button>
  );
};

export { ButtonBase };
