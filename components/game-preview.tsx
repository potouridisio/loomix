"use client";

import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Download,
  Gamepad2,
  Globe,
  Sparkles,
  Loader2,
  MoreHorizontal,
  RefreshCw,
  Clapperboard,
  Share2,
  Trash2,
  Send,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ShareButton } from "@/components/share-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface GamePreviewProps {
  isGenerating: boolean;
  gameGenerated: boolean;
  prompt: string;
  isPublished?: boolean;
}

const refinementSuggestions = [
  "Make enemies faster",
  "Add power-ups",
  "Change background color",
  "Add more obstacles",
];

export function GamePreview({ isGenerating, gameGenerated, prompt, isPublished = false }: GamePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);

  const handlePublish = () => {
    // TODO: Implement actual publish logic
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const handleRefine = () => {
    if (!refinementPrompt.trim()) return;
    setIsRefining(true);
    // Simulate refinement time
    setTimeout(() => {
      setIsRefining(false);
      setRefinementPrompt("");
    }, 2000);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    // Simulate regeneration time
    setTimeout(() => {
      setIsRegenerating(false);
    }, 3000);
  };

  if (!prompt && !isGenerating && !gameGenerated) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Card className="w-full max-w-lg border-dashed bg-card/50">
          <CardHeader className="space-y-4 p-8 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-10 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">Create Your Game</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Enter a description of your game idea on the left panel to get started. Our AI will
                generate a playable 2D game based on your prompt.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Card className="max-w-md bg-card/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
            <CardTitle>Generating Your Game</CardTitle>
            <CardDescription>
              Our AI is creating your game based on your description. This usually takes about 30-60
              seconds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <GenerationStep label="Analyzing prompt" status="done" />
              <GenerationStep label="Designing game mechanics" status="in-progress" />
              <GenerationStep label="Creating sprites & assets" status="pending" />
              <GenerationStep label="Generating game logic" status="pending" />
              <GenerationStep label="Finalizing game" status="pending" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameGenerated) {
    return (
      <div className="flex h-full w-full flex-col gap-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-card/50 p-2">
          <Dialog>
            <DialogTrigger asChild>
              <button className="group inline-flex max-w-50 min-w-0 items-center gap-1 overflow-hidden px-2 text-left sm:max-w-75 lg:max-w-100">
                <span className="truncate text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Generated from:</span> {prompt}
                </span>
                <ChevronRight className="size-3 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Original Prompt</DialogTitle>
                <DialogDescription>The prompt used to generate this game</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm">{prompt}</p>
                </div>
                <Button variant="outline" className="w-full gap-2" onClick={handleCopyPrompt}>
                  {promptCopied ? (
                    <>
                      <Check className="size-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copy Prompt
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex shrink-0 items-center gap-1">
            {/* Desktop visible: Edit, Publish/Unpublish, Share */}
            <Button variant="ghost" size="sm" className="hidden gap-2 sm:inline-flex" disabled>
              <Clapperboard className="size-4" />
              Edit
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                Soon
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" className="hidden gap-2 sm:inline-flex" onClick={handlePublish}>
              <Globe className="size-4" />
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ShareButton
              url={`${typeof window !== "undefined" ? window.location.origin : ""}/game/preview`}
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            />

            {/* Desktop overflow menu: Download, Delete */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="hidden sm:inline-flex">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">More</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <Download className="size-4" />
                  Download
                  <Badge variant="secondary" className="ml-auto px-1.5 py-0 text-[10px]">
                    Soon
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile: all actions in menu */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="sm:hidden">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">More</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <Clapperboard className="size-4" />
                  Edit
                  <Badge variant="secondary" className="ml-auto px-1.5 py-0 text-[10px]">
                    Soon
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handlePublish}>
                  <Globe className="size-4" />
                  {isPublished ? "Unpublish" : "Publish"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="size-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Download className="size-4" />
                  Download
                  <Badge variant="secondary" className="ml-auto px-1.5 py-0 text-[10px]">
                    Soon
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="relative flex-1 overflow-hidden rounded-xl border border-border/50 bg-card">
          {/* Game placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-accent/5">
            <div className="text-center">
              <Gamepad2 className="mx-auto mb-4 size-16 text-primary/30" />
              <p className="text-lg font-medium text-foreground">Game Preview</p>
              <p className="text-sm text-muted-foreground">
                Press play to start your generated game
              </p>
            </div>
          </div>

          {/* Refining Overlay */}
          {isRefining && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center">
                <Loader2 className="mx-auto mb-4 size-16 animate-spin text-primary/30" />
                <p className="text-lg font-medium text-foreground">Refining Game</p>
                <p className="text-sm text-muted-foreground">Applying your changes...</p>
              </div>
            </div>
          )}

          {/* Regenerating Overlay */}
          {isRegenerating && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center">
                <Loader2 className="mx-auto mb-4 size-16 animate-spin text-primary/30" />
                <p className="text-lg font-medium text-foreground">Regenerating Game</p>
                <p className="text-sm text-muted-foreground">Creating a new version...</p>
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/50 bg-background/80 p-2 backdrop-blur-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-10 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{isPlaying ? "Pause" : "Play"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="size-10 rounded-full">
                  <RotateCcw className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Restart</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-10 rounded-full"
                  onClick={handleRegenerate}
                  disabled={isRegenerating || isRefining}
                >
                  <RefreshCw className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Regenerate (1 credit)</TooltipContent>
            </Tooltip>
            <div className="h-6 w-px bg-border" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="size-10 rounded-full" asChild>
                  <Link href="/game/preview">
                    <Maximize2 className="size-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Fullscreen</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Refinement Section */}
        <div className="space-y-3 rounded-xl border border-border/50 bg-card p-4">
          <h4 className="text-sm font-medium">Refine your game</h4>
          <div className="relative">
            <Textarea
              placeholder="Make enemies faster, add power-ups, change colors..."
              value={refinementPrompt}
              onChange={(e) => setRefinementPrompt(e.target.value)}
              className="h-24 resize-none pr-4 pb-10"
              disabled={isRefining}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={handleRefine}
                  disabled={!refinementPrompt.trim() || isRefining}
                  className="absolute right-2 bottom-2 size-7 text-muted-foreground hover:text-foreground"
                >
                  {isRefining ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Refine (1 credit)</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {refinementSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setRefinementPrompt(suggestion)}
                className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function GenerationStep({
  label,
  status,
}: {
  label: string;
  status: "pending" | "in-progress" | "done";
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full",
          status === "done" && "bg-primary text-primary-foreground",
          status === "in-progress" && "bg-primary/20",
          status === "pending" && "bg-muted",
        )}
      >
        {status === "done" && (
          <svg
            className="size-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {status === "in-progress" && (
          <div className="size-2 animate-pulse rounded-full bg-primary" />
        )}
      </div>
      <span
        className={cn(
          "text-sm",
          status === "done" && "text-foreground",
          status === "in-progress" && "font-medium text-primary",
          status === "pending" && "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );
}
