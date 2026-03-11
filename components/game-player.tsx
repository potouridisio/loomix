"use client";

import { Play, Pause, RotateCcw, Volume2, VolumeX, Gamepad2 } from "lucide-react";
import { useState } from "react";

import type { Game } from "@/lib/games-data";

import { GameRatingDialog } from "@/components/game-rating";
import { Button } from "@/components/ui/button";

interface GamePlayerProps {
  game: Game;
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [hasShownRating, setHasShownRating] = useState(false);

  const handlePause = () => {
    setIsPlaying(false);
    if (!hasShownRating) {
      setShowRatingDialog(true);
      setHasShownRating(true);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-background">
      {/* Game Canvas Area */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Game placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Gamepad2 className="mx-auto mb-4 size-20 text-primary/30" />
            <p className="text-xl font-medium text-foreground">{game.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {isPlaying ? "Game is running..." : "Press play to start"}
            </p>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/50 bg-background/90 p-2 backdrop-blur-sm">
          <Button
            size="icon"
            variant="ghost"
            className="size-12 rounded-full"
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? <Pause className="size-6" /> : <Play className="size-6" />}
          </Button>
          <Button size="icon" variant="ghost" className="size-12 rounded-full">
            <RotateCcw className="size-5" />
          </Button>
          <div className="h-8 w-px bg-border" />
          <Button
            size="icon"
            variant="ghost"
            className="size-12 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Rating Dialog */}
      <GameRatingDialog open={showRatingDialog} onOpenChange={setShowRatingDialog} />
    </div>
  );
}
