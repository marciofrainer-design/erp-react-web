export type LoadingVariant = "inline" | "page" | "overlay";
export type LoadingSize = "sm" | "md" | "lg";
export type LoadingProps = {
  title?: string;
  description?: string;
  variant?: LoadingVariant;
  size?: LoadingSize;
  className?: string;
};