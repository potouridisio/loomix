"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
  className?: string;
  showLabel?: boolean;
}

export function ShareButton({
  url,
  variant = "outline",
  size = "default",
  className,
  showLabel = true,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant={variant} size={size} className={cn("gap-2", className)} onClick={handleShare}>
      {copied ? (
        <>
          <Check className="size-4" />
          {showLabel && "Copied!"}
        </>
      ) : (
        <>
          <Share2 className="size-4" />
          {showLabel && "Share"}
        </>
      )}
    </Button>
  );
}
