import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingVariant = "inline" | "page" | "overlay";
type LoadingSize = "sm" | "md" | "lg";

type LoadingProps = {
  title?: string;
  description?: string;
  variant?: LoadingVariant;
  size?: LoadingSize;
  className?: string;
};

const wrapperVariants: Record<LoadingVariant, string> = {
  inline: "w-full py-4",
  page: "min-h-[50vh] w-full rounded-xl border border-border/60 bg-card/80 px-6 py-10",
  overlay:
    "absolute inset-0 z-30 rounded-xl bg-background/85 backdrop-blur-xs px-6 py-10",
};

const ringSizes: Record<LoadingSize, string> = {
  sm: "size-10",
  md: "size-14",
  lg: "size-18",
};

const iconSizes: Record<LoadingSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export function Loading({
  title = "Carregando",
  description = "Aguarde um momento...",
  variant = "inline",
  size = "md",
  className,
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-4 text-center",
        wrapperVariants[variant],
        className,
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute -inset-4 rounded-full bg-linear-to-tr from-primary/25 via-transparent to-secondary/30 blur-lg animate-pulse",
            size === "lg" ? "-inset-5" : "-inset-4",
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            "relative rounded-full border-2 border-primary/20",
            ringSizes[size],
          )}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" />
          <div className="absolute inset-2 rounded-full border border-secondary/35" />
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderCircle className={cn("animate-spin text-primary", iconSizes[size])} />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold tracking-wide text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
