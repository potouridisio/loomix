"use client";

import {
  Sparkles,
  CircleCheck,
  ChevronDown,
  Loader2,
  Dices,
  Crown,
  Plus,
  Coins,
  Circle,
  Clock,
  Eye,
} from "lucide-react";
import { useState } from "react";

import { BuyCreditsDialog } from "@/components/buy-credits-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "platformer",
    name: "Platformer",
    description: "Jump between platforms and avoid hazards",
  },
  {
    id: "endless-runner",
    name: "Endless Runner",
    description: "Run endlessly while dodging obstacles",
  },
  {
    id: "puzzle",
    name: "Grid Puzzle",
    description: "Solve puzzles by pushing blocks and activating switches",
  },
  {
    id: "topdown",
    name: "Top-Down Adventure",
    description: "Explore, avoid enemies, and find the exit",
    pro: true,
  },
  {
    id: "shooter",
    name: "Shooter Arena",
    description: "Shoot enemies and survive incoming waves",
    pro: true,
  },

  {
    id: "tower-defense",
    name: "Tower Defense",
    description: "Place defenses and stop incoming enemies",
    soon: true,
  },
  {
    id: "match-3",
    name: "Match-3",
    description: "Swap tiles to create matching combinations",
    soon: true,
  },
];

const styleOptions = [
  { id: "pixel", name: "Pixel Art" },
  { id: "minimal", name: "Minimal" },
  { id: "retro", name: "Retro" },
  { id: "neon", name: "Neon", pro: true },
  { id: "cartoon", name: "Cartoon", soon: true },
  { id: "3d", name: "3D Style", soon: true },
];

const difficultyOptions = [
  { id: "easy", name: "Easy" },
  { id: "medium", name: "Medium" },
  { id: "hard", name: "Hard" },
];

// Change these to test dialogs
const IS_PRO_USER = false;
const FREE_CREDITS_USED = 2;
const FREE_CREDITS_LIMIT = 5;
const PRO_CREDITS_USED = 16;
const PRO_CREDITS_LIMIT = 50;

const randomPrompts = [
  "A platformer where you play as a robot collecting energy cells in a futuristic factory filled with conveyor belts and laser traps.",
  "A space shooter where you defend Earth from waves of alien invaders using upgradeable weapons and shields.",
  "A puzzle game where you manipulate gravity to guide a ball through impossible mazes.",
  "A racing game set on neon-lit cyberpunk streets with boost pads and destructible obstacles.",
  "An arcade game where you're a chef catching falling ingredients to make increasingly complex recipes.",
  "A dungeon crawler where each room is randomly generated and you only have one life.",
  "A rhythm game where you dodge obstacles by moving to the beat of synthwave music.",
  "A tower defense game where you place turrets to protect a crystal from waves of shadow creatures.",
  "A stealth game where you're a cat burglar sneaking through a museum to steal priceless artifacts.",
  "A survival game where you're stranded on an alien planet and must craft tools from strange materials.",
];

interface CreateSidebarProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  initialTemplate?: string | null;
  initialStyle?: string | null;
  gameGenerated?: boolean;
  onOpenPreview?: () => void;
}

export function CreateSidebar({
  prompt,
  setPrompt,
  isGenerating,
  onGenerate,
  initialTemplate,
  initialStyle,
  gameGenerated,
  onOpenPreview,
}: CreateSidebarProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
    initialTemplate || "platformer",
  );
  const [selectedStyle, setSelectedStyle] = useState(initialStyle || "pixel");
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [gameTitle, setGameTitle] = useState("");
  const [creditsDialogOpen, setCreditsDialogOpen] = useState(false);
  const [buyCreditsDialogOpen, setBuyCreditsDialogOpen] = useState(false);
  const [outOfCreditsDialogOpen, setOutOfCreditsDialogOpen] = useState(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [isPro, setIsPro] = useState(IS_PRO_USER);

  // Calculate credits based on plan
  const creditsUsed = isPro ? PRO_CREDITS_USED : FREE_CREDITS_USED;
  const creditsLimit = isPro ? PRO_CREDITS_LIMIT : FREE_CREDITS_LIMIT;
  const creditsRemaining = creditsLimit - creditsUsed;

  const handlePurchaseCredits = () => {
    setCreditsDialogOpen(false);
    setOutOfCreditsDialogOpen(false);
    // In real app, would update credits via API
  };

  const handleGenerateClick = () => {
    if (!isPro && creditsRemaining <= 0) {
      setUpgradeDialogOpen(true);
      return;
    }
    if (isPro && creditsRemaining <= 0) {
      setOutOfCreditsDialogOpen(true);
      return;
    }
    onGenerate();
  };

  const handleUpgradeToPro = () => {
    setUpgradeDialogOpen(false);
    setIsPro(true);
  };

  const randomizePrompt = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    setPrompt(randomPrompts[randomIndex]);
  };

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 overflow-auto">
        {/* Prompt Section */}
        <div className="space-y-2 p-4">
          <Label htmlFor="prompt" className="text-sm font-medium">
            Describe your game
          </Label>
          <div className="relative">
            <Textarea
              id="prompt"
              placeholder="A platformer where you play as a robot collecting energy cells in a futuristic factory..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-32 pr-4 pb-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute bottom-2 left-2 size-7 text-muted-foreground hover:text-foreground"
              disabled
              title="Upload assets (Coming soon)"
            >
              <Plus className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2 size-7 text-muted-foreground hover:text-foreground"
              onClick={randomizePrompt}
              title="Random prompt"
            >
              <Dices className="size-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Templates */}
        <div className="p-4">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md py-1 outline-none focus-visible:ring-[0.5px] focus-visible:ring-ring">
              <span className="text-sm font-medium">Game Template</span>
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 overflow-hidden pt-3">
              <div className="grid grid-cols-2 gap-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() =>
                      !(template.pro || template.soon) &&
                      setSelectedTemplate(selectedTemplate === template.id ? null : template.id)
                    }
                    disabled={template.pro || template.soon}
                    className={cn(
                      "relative flex flex-col items-start gap-0.5 rounded-lg border p-2.5 text-left transition-colors outline-none",
                      template.pro || template.soon
                        ? "cursor-not-allowed border-border/50 opacity-60"
                        : selectedTemplate === template.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-primary/5 focus-visible:border-primary/50 focus-visible:bg-primary/5",
                    )}
                  >
                    {template.pro ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Crown className="absolute top-2 right-2 size-3 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent side="top">Pro feature</TooltipContent>
                      </Tooltip>
                    ) : template.soon ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Clock className="absolute top-2 right-2 size-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="top">Coming soon</TooltipContent>
                      </Tooltip>
                    ) : selectedTemplate === template.id ? (
                      <CircleCheck className="absolute top-2 right-2 size-3.5 text-primary" />
                    ) : (
                      <Circle className="absolute top-2 right-2 size-3.5 text-muted-foreground/50" />
                    )}
                    <span className="text-xs font-medium">{template.name}</span>
                    <span className="text-xs leading-tight text-muted-foreground">
                      {template.description}
                    </span>
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Separator />

        {/* Style & Difficulty Options */}
        <div className="p-4">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md py-1 outline-none focus-visible:ring-[0.5px] focus-visible:ring-ring">
              <span className="text-sm font-medium">Style & Difficulty</span>
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 overflow-hidden pt-3">
              {/* Art Style */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Art Style</Label>
                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((style) => {
                    const badge = (
                      <Badge
                        key={style.id}
                        variant={selectedStyle === style.id ? "default" : "outline"}
                        className={cn(
                          "gap-1 transition-colors",
                          style.pro || style.soon
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer",
                          selectedStyle === style.id
                            ? "bg-primary text-primary-foreground"
                            : style.pro || style.soon
                              ? ""
                              : "hover:bg-accent",
                        )}
                        onClick={() => !(style.pro || style.soon) && setSelectedStyle(style.id)}
                      >
                        {style.name}
                        {style.pro && <Crown className="size-2.5" />}
                        {style.soon && <Clock className="size-2.5" />}
                      </Badge>
                    );

                    if (style.pro) {
                      return (
                        <Tooltip key={style.id}>
                          <TooltipTrigger asChild>{badge}</TooltipTrigger>
                          <TooltipContent side="top">Pro feature</TooltipContent>
                        </Tooltip>
                      );
                    }
                    if (style.soon) {
                      return (
                        <Tooltip key={style.id}>
                          <TooltipTrigger asChild>{badge}</TooltipTrigger>
                          <TooltipContent side="top">Coming soon</TooltipContent>
                        </Tooltip>
                      );
                    }
                    return badge;
                  })}
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Difficulty</Label>
                <div className="flex gap-2">
                  {difficultyOptions.map((difficulty) => (
                    <Badge
                      key={difficulty.id}
                      variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedDifficulty === difficulty.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent",
                      )}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                    >
                      {difficulty.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Separator />

        {/* Game Title (Optional) */}
        <div className="p-4">
          <div className="flex w-full items-center justify-between py-1">
            <span className="text-sm font-medium">Game Title</span>
          </div>
          <div className="space-y-4 pt-3">
            <div className="space-y-2">
              <Label htmlFor="game-title" className="text-xs text-muted-foreground">
                Title <span className="font-normal">(optional)</span>
              </Label>
              <Input
                id="game-title"
                placeholder="My Awesome Game"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Upgrade to Pro Dialog */}
      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="size-5 text-primary" />
              Upgrade to Gamepop Pro
            </DialogTitle>
            <DialogDescription>
              Unlock all features and start creating amazing games.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3 rounded-lg border border-primary/50 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Gamepop Pro</span>
                <div className="text-right">
                  <span className="text-2xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-primary" />
                  50 credits per month
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-primary" />
                  Access to all game templates
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-primary" />
                  All art styles including Neon
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-primary" />
                  Priority generation queue
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-primary" />
                  Early access to new features
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full gap-2" onClick={handleUpgradeToPro}>
              <Crown className="size-4" />
              Upgrade to Pro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Out of Credits Dialog */}
      <Dialog open={outOfCreditsDialogOpen} onOpenChange={setOutOfCreditsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Out of Credits</DialogTitle>
            <DialogDescription>
              You don&apos;t have enough credits to generate a game. Purchase more credits to
              continue creating.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              className="w-full gap-2"
              onClick={() => {
                setOutOfCreditsDialogOpen(false);
                setBuyCreditsDialogOpen(true);
              }}
            >
              <Coins className="size-4" />
              Buy Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Buy Credits Dialog */}
      <BuyCreditsDialog open={buyCreditsDialogOpen} onOpenChange={setBuyCreditsDialogOpen} />

      {/* Generate Button */}
      <div className="shrink-0 space-y-3 border-t border-border/50 p-4">
        <Dialog open={creditsDialogOpen} onOpenChange={setCreditsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="w-full justify-between">
              <span className="text-muted-foreground">Credits</span>
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <Coins className="size-4 text-primary" />
                <span>{creditsRemaining > 50 ? creditsRemaining : `${creditsRemaining} / 50`}</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            {isPro ? (
              <>
                <DialogHeader>
                  <DialogTitle>Credits</DialogTitle>
                  <DialogDescription>
                    You have {creditsRemaining} credits remaining.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Need more credits? Purchase additional credits to keep creating games.
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    className="w-full gap-2"
                    onClick={() => {
                      setCreditsDialogOpen(false);
                      setBuyCreditsDialogOpen(true);
                    }}
                  >
                    <Coins className="size-4" />
                    Buy Credits
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Credits</DialogTitle>
                  <DialogDescription>
                    You have {creditsRemaining} of {creditsLimit} free credits remaining this month.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Upgrade to Pro to get 50 credits every month and the ability to purchase
                    additional credits anytime.
                  </p>
                </div>
                <DialogFooter>
                  <Button className="w-full gap-2" onClick={handleUpgradeToPro}>
                    <Crown className="size-4" />
                    Upgrade to Pro
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
        {/* Preview Button (Mobile) */}
        {gameGenerated && onOpenPreview && (
          <Button
            variant="outline"
            size="lg"
            className="w-full gap-2 lg:hidden"
            onClick={onOpenPreview}
          >
            <Eye className="size-4" />
            Preview
          </Button>
        )}
        <Button
          className="w-full gap-2"
          size="lg"
          onClick={handleGenerateClick}
          disabled={!prompt.trim() || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              {gameGenerated ? "Generate New Game" : "Generate Game"}
              <span className="text-xs opacity-70">(1 credit)</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
