"use client";

import { Play, Eye, Gamepad2, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  plays: number;
  author: string;
  genre: string;
  isNew?: boolean;
  rating?: number;
}

function formatPlays(plays: number): string {
  if (plays >= 1000) {
    return `${(plays / 1000).toFixed(1)}k`;
  }
  return plays.toString();
}

export function GameCard({ game }: { game: Game }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/game/${game.id}`}>
      <Card
        className="group flex cursor-pointer flex-col gap-0 overflow-hidden border-border/50 bg-card/50 p-0 transition-all duration-300 hover:border-primary/50 hover:bg-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          {/* Placeholder gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-accent to-secondary" />

          {/* Game icon placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Gamepad2 className="size-12 text-primary/50" />
          </div>

          {/* Play overlay */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-background/80 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <Button size="lg" className="gap-2">
              <Play className="size-4" />
              Play Now
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {game.genre}
            </Badge>
            {game.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          <h4 className="mb-1 truncate font-semibold text-foreground transition-colors group-hover:text-primary">
            {game.title}
          </h4>
          <p className="mb-3 line-clamp-2 min-h-10 text-sm text-muted-foreground">
            {game.description}
          </p>
          <div className="mt-auto flex items-center justify-between text-xs">
            <span className="text-muted-foreground">by {game.author}</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              {game.rating && !game.isNew && (
                <div className="flex items-center gap-0.5">
                  <Star className="size-3 fill-muted-foreground text-muted-foreground" />
                  <span>{game.rating.toFixed(1)}</span>
                </div>
              )}
              <div className="flex items-center gap-0.5">
                <Eye className="size-3" />
                <span>{formatPlays(game.plays)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
