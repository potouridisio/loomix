"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

import { AppGridBackground } from "@/components/app-grid-background";
import { CreateSidebar } from "@/components/create-sidebar";
import { GamePreview } from "@/components/game-preview";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function CreatePageContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";
  const initialTemplate = searchParams.get("template") || null;
  const initialStyle = searchParams.get("style") || null;
  const [prompt, setPrompt] = useState(initialPrompt);
  const [generatedGamePrompt, setGeneratedGamePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameGenerated, setGameGenerated] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGeneratedGamePrompt(prompt); // Store the prompt used for this generation
    setIsGenerating(true);
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
      setGameGenerated(true);
      // Only show mobile preview sheet on smaller screens (below lg breakpoint)
      if (window.innerWidth < 1024) {
        setShowMobilePreview(true);
      }
    }, 3000);
  };

  return (
    <div className="relative z-0 flex flex-1 overflow-hidden">
      {/* App Grid Background */}
      <AppGridBackground className="opacity-[0.04]!" />

      {/* Creation Sidebar */}
      <aside className="flex h-[calc(100dvh-56px)] w-full shrink-0 flex-col border-r border-border/50 bg-card/30 md:h-screen lg:w-80 xl:w-96">
        <CreateSidebar
          prompt={prompt}
          setPrompt={setPrompt}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          initialTemplate={initialTemplate}
          initialStyle={initialStyle}
          gameGenerated={gameGenerated}
          onOpenPreview={() => setShowMobilePreview(true)}
        />
      </aside>

      {/* Game Preview - Hidden on mobile and tablet */}
      <div className="hidden flex-1 p-6 lg:block">
        <div className="h-full w-full">
          <GamePreview
            isGenerating={isGenerating}
            gameGenerated={gameGenerated}
            prompt={generatedGamePrompt}
          />
        </div>
      </div>

      {/* Mobile Preview Sheet */}
      <Sheet open={showMobilePreview} onOpenChange={setShowMobilePreview}>
        <SheetContent side="bottom" className="h-[85dvh] gap-0 p-0 lg:hidden">
          <SheetHeader className="px-4 pt-4 pb-0 text-left">
            <SheetTitle className="text-left">Game Preview</SheetTitle>
            <SheetDescription className="sr-only">Preview your generated game</SheetDescription>
          </SheetHeader>
          <div className="h-[calc(85dvh-48px)] flex-1 p-4">
            <GamePreview
              isGenerating={isGenerating}
              gameGenerated={gameGenerated}
              prompt={prompt}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="flex-1" />}>
        <CreatePageContent />
      </Suspense>
    </div>
  );
}
