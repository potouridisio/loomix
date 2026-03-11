"use client";

import { Filter, Gamepad2 } from "lucide-react";
import { Search } from "lucide-react";
import { useState } from "react";

import { ExploreFilters } from "@/components/explore-filters";
import { GameCard } from "@/components/game-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const allGames = [
  {
    id: "1",
    title: "Space Defender",
    description: "Defend your ship from incoming asteroids",
    thumbnail: "/games/space-defender.jpg",
    plays: 12500,
    author: "CosmicDev",
    genre: "Shooter",
    rating: 4.3,
  },
  {
    id: "2",
    title: "Pixel Dungeon",
    description: "Explore dangerous dungeons and collect treasures",
    thumbnail: "/games/pixel-dungeon.jpg",
    plays: 9800,
    author: "RetroGamer",
    genre: "Adventure",
    rating: 4.7,
  },
  {
    id: "3",
    title: "Neon Racer",
    description: "High-speed action through neon cityscapes",
    thumbnail: "/games/neon-racer.jpg",
    plays: 8200,
    author: "SpeedKing",
    genre: "Arcade",
    rating: 4.1,
  },
  {
    id: "4",
    title: "Forest Quest",
    description: "A peaceful puzzle game in an enchanted forest",
    thumbnail: "/games/forest-quest.jpg",
    plays: 7500,
    author: "PuzzleMaster",
    genre: "Puzzle",
    rating: 4.5,
  },
  {
    id: "5",
    title: "Cyber Shooter",
    description: "Action-packed cyberpunk shooting game",
    thumbnail: "/games/cyber-shooter.jpg",
    plays: 45000,
    author: "NeonNinja",
    genre: "Shooter",
    rating: 4.8,
  },
  {
    id: "6",
    title: "Castle Builder",
    description: "Build your castle, explore, and survive raids",
    thumbnail: "/games/castle-builder.jpg",
    plays: 38000,
    author: "StrategyPro",
    genre: "Adventure",
    rating: 4.6,
  },
  {
    id: "7",
    title: "Ocean Explorer",
    description: "Dive deep and discover underwater secrets",
    thumbnail: "/games/ocean-explorer.jpg",
    plays: 32000,
    author: "AquaGames",
    genre: "Adventure",
    rating: 4.4,
  },
  {
    id: "8",
    title: "Sky Jump",
    description: "Jump through clouds in this endless platformer",
    thumbnail: "/games/sky-jump.jpg",
    plays: 28000,
    author: "CloudMaker",
    genre: "Platformer",
    rating: 4.2,
  },
  {
    id: "9",
    title: "Robot Factory",
    description: "Solve automation puzzles in a robot factory",
    thumbnail: "/games/robot-factory.jpg",
    plays: 1200,
    author: "TechBuilder",
    genre: "Puzzle",
    isNew: true,
    rating: 4.0,
  },
  {
    id: "10",
    title: "Magic Cards",
    description: "Plan smart moves in a tactical card puzzle",
    thumbnail: "/games/magic-cards.jpg",
    plays: 890,
    author: "CardMaster",
    genre: "Puzzle",
    isNew: true,
    rating: 3.9,
  },
  {
    id: "11",
    title: "Dino Run",
    description: "Escape the meteor as a tiny dinosaur",
    thumbnail: "/games/dino-run.jpg",
    plays: 650,
    author: "PrehistoricGames",
    genre: "Arcade",
    isNew: true,
    rating: 4.1,
  },
  {
    id: "12",
    title: "Garden Grow",
    description: "Arrange tiles to grow the perfect garden",
    thumbnail: "/games/garden-grow.jpg",
    plays: 420,
    author: "GreenThumb",
    genre: "Puzzle",
    isNew: true,
    rating: 4.3,
  },
  {
    id: "13",
    title: "Ninja Slash",
    description: "Dash, dodge, and strike through enemy patrols",
    thumbnail: "/games/ninja-slash.jpg",
    plays: 15600,
    author: "ShadowGames",
    genre: "Adventure",
    rating: 4.5,
  },
  {
    id: "14",
    title: "Bubble Pop",
    description: "Relaxing bubble popping puzzle game",
    thumbnail: "/games/bubble-pop.jpg",
    plays: 22000,
    author: "ChillDev",
    genre: "Puzzle",
    rating: 4.0,
  },
  {
    id: "15",
    title: "Tower Defense Pro",
    description: "Defend lanes with traps and clever placement",
    thumbnail: "/games/tower-defense.jpg",
    plays: 18500,
    author: "StrategicMind",
    genre: "Shooter",
    rating: 4.4,
  },
  {
    id: "16",
    title: "Retro Runner",
    description: "Classic endless runner with pixel art style",
    thumbnail: "/games/retro-runner.jpg",
    plays: 11200,
    author: "PixelPerfect",
    genre: "Arcade",
    rating: 4.2,
  },
];

export function ExploreGameGrid() {
  const [displayCount, setDisplayCount] = useState(12);

  const displayedGames = allGames.slice(0, displayCount);
  const hasMore = displayCount < allGames.length;

  return (
    <div className="space-y-6">
      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between lg:hidden">
        <p className="text-sm text-muted-foreground">{allGames.length} games found</p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="size-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col overflow-hidden p-0">
            <div className="shrink-0 space-y-4 px-6 pt-6 pb-4">
              <SheetHeader className="p-0">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Filter games by genre, popularity, and more.</SheetDescription>
              </SheetHeader>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Search</Label>
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="text" placeholder="Search games..." className="pl-9" />
                </div>
              </div>
            </div>
            <ScrollArea className="h-0 flex-1">
              <ExploreFilters hideSearch />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Game Count */}
      <div className="hidden lg:block">
        <p className="text-sm text-muted-foreground">{allGames.length} games found</p>
      </div>

      {/* Games Grid */}
      {displayedGames.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-6">
              <Button variant="outline" onClick={() => setDisplayCount((prev) => prev + 8)}>
                Load More Games
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
            <Gamepad2 className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No games found</h3>
          <p className="mb-6 max-w-sm text-muted-foreground">
            Try adjusting your filters or check back later for new games.
          </p>
          <Button variant="outline" asChild>
            <a href="/create">Create a Game</a>
          </Button>
        </div>
      )}
    </div>
  );
}
