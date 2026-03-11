"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--success-bg": "hsl(var(--card) / 0.3)",
          "--success-border": "hsl(var(--border) / 0.5)",
          "--success-text": "hsl(var(--foreground))",
          "--info-bg": "hsl(var(--card) / 0.3)",
          "--info-border": "hsl(var(--border) / 0.5)",
          "--info-text": "hsl(var(--foreground))",
          "--normal-bg": "hsl(var(--card) / 0.3)",
          "--normal-border": "hsl(var(--border) / 0.5)",
          "--normal-text": "hsl(var(--foreground))",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "border! border-border/50! bg-card/30! backdrop-blur-sm shadow-lg",
          title: "text-white! font-medium",
          description: "text-muted-foreground!",
          icon: "hidden!",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
