import { Button } from "@/components/ui/button";

type ButtonBaseProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const ButtonBase = ({ children, disabled, onClick }: ButtonBaseProps) => {
  return (
    <Button onClick={onClick} 
      disabled={disabled}
      className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all shadow-sm active:transform active:scale-95"
      style={{
        backgroundColor: 'var(--color-button-bg)',
        color: 'var(--color-button-text)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-button-bg-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-button-bg)';
      }}>
      {children}
    </Button>
  );
}

export { ButtonBase };