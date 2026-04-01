import type { LoadingVariant, LoadingSize } from "./types";

export const wrapperVariants: Record<LoadingVariant, string> = {
  inline: "w-full py-4",
  page: "min-h-[50vh] w-full rounded-xl border border-border/60 bg-card/80 px-6 py-10",
  overlay:
    "absolute inset-0 z-30 rounded-xl bg-background/85 backdrop-blur-xs px-6 py-10",
};

export const ringSizes: Record<LoadingSize, string> = {
  sm: "size-10",
  md: "size-14",
  lg: "size-18",
};

export const iconSizes: Record<LoadingSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};