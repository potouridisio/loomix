"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Static suggestions using only free templates and styles
const suggestions = [
  { text: "Cat collecting fish", template: "platformer", style: "pixel" },
  { text: "Run through a neon city", template: "endless-runner", style: "retro" },
  { text: "Push blocks onto switches", template: "puzzle", style: "minimal" },
  { text: "Jump between platforms", template: "platformer", style: "retro" },
];

export function GamePromptInput({ className }: { className?: string }) {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      const params = new URLSearchParams({ prompt });
      if (selectedTemplate) params.set("template", selectedTemplate);
      if (selectedStyle) params.set("style", selectedStyle);
      router.push(`/create?${params.toString()}`);
    }
  };

  const handleSuggestionClick = (suggestion: (typeof suggestions)[0]) => {
    setPrompt(suggestion.text);
    setSelectedTemplate(suggestion.template);
    setSelectedStyle(suggestion.style);
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "relative flex items-center rounded-xl border bg-card p-1.5 transition-colors sm:p-2",
            isFocused ? "border-primary" : "border-border",
          )}
        >
          <Sparkles className="ml-2 size-4 shrink-0 text-primary sm:ml-3 sm:size-5" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your game idea..."
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground sm:px-4 sm:py-3 sm:text-base"
          />
          <Button
            type="submit"
            size="lg"
            disabled={!prompt.trim()}
            className="h-9 shrink-0 gap-1.5 px-3 text-sm sm:h-10 sm:gap-2 sm:px-4 sm:text-base"
          >
            <span className="hidden sm:inline">Create</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:mt-4 sm:gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSuggestionClick(suggestion)}
            className="rounded-full border border-border bg-secondary/50 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none sm:px-3 sm:py-1.5 sm:text-sm"
          >
            {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
}
