"use client";

import { cn } from "@/lib/utils";

export function AppGridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.42)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black_0%,black_28%,transparent_62%)] bg-size-[24px_24px] opacity-[0.04] md:bg-size-[32px_32px] md:opacity-[0.055] xl:bg-size-[40px_40px] xl:opacity-[0.07]",
        className,
      )}
    />
  );
}
