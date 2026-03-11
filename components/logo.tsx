import localFont from "next/font/local";

import { cn } from "@/lib/utils";

export const bytesized = localFont({
  src: "../public/Bytesized-Regular.ttf",
});

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-block translate-x-1/10 leading-none select-none",
        sizeClasses[size],
        className,
      )}
      style={bytesized.style}
    >
      l
    </span>
  );
}
