"use client";

import { Plus, Search, LayoutGrid, List, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AppGridBackground } from "@/components/app-grid-background";
import { LibraryGameCard } from "@/components/library-game-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userGames = [
  {
    id: "1",
    title: "My Space Shooter",
    description: "A fast-paced space shooting game with power-ups",
    thumbnail: "/games/my-space-shooter.jpg",
    createdAt: "2026-02-28",
    lastPlayed: "2026-03-02",
    plays: 45,
    status: "published" as const,
    rating: 4.2,
  },
  {
    id: "2",
    title: "Pixel Adventure",
    description: "Explore a pixelated world full of secrets",
    thumbnail: "/games/pixel-adventure.jpg",
    createdAt: "2026-02-20",
    lastPlayed: "2026-02-25",
    plays: 128,
    status: "published" as const,
    rating: 4.5,
  },
  {
    id: "3",
    title: "Racing Challenge",
    description: "High-speed racing through neon cities",
    thumbnail: "/games/racing-challenge.jpg",
    createdAt: "2026-02-15",
    lastPlayed: "2026-02-18",
    plays: 32,
    status: "draft" as const,
  },
  {
    id: "4",
    title: "Puzzle Master",
    description: "Mind-bending puzzles to test your skills",
    thumbnail: "/games/puzzle-master.jpg",
    createdAt: "2026-02-10",
    lastPlayed: "2026-02-12",
    plays: 67,
    status: "published" as const,
    rating: 3.9,
  },
  {
    id: "5",
    title: "Castle Defense",
    description: "Defend your castle from waves of enemies",
    thumbnail: "/games/castle-defense.jpg",
    createdAt: "2026-02-05",
    lastPlayed: "2026-02-08",
    plays: 89,
    status: "published" as const,
    rating: 4.7,
  },
  {
    id: "6",
    title: "Untitled Game",
    description: "Work in progress",
    thumbnail: "/games/untitled.jpg",
    createdAt: "2026-03-01",
    lastPlayed: null,
    plays: 0,
    status: "draft" as const,
  },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredGames = userGames.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "plays":
        return b.plays - a.plays;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="relative z-0 flex min-h-screen flex-col">
      {/* App Grid Background */}
      <AppGridBackground className="opacity-[0.04]!" />

      <div className="flex-1 p-4 pt-16 pb-8 sm:p-6 md:pt-6 md:pb-6">
        {/* Header Actions */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Your Games</h2>
            <p className="text-muted-foreground">{userGames.length} games in your library</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/create">
              <Plus className="size-4" />
              Create New Game
            </Link>
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="plays">Most Played</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex rounded-lg border border-border p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="size-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("list")}
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Games Grid/List */}
        {sortedGames.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-4"
            }
          >
            {sortedGames.map((game) => (
              <LibraryGameCard key={game.id} game={game} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              {searchQuery ? (
                <Search className="size-8 text-muted-foreground" />
              ) : (
                <Gamepad2 className="size-8 text-muted-foreground" />
              )}
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              {searchQuery ? "No games found" : "No games yet"}
            </h3>
            <p className="mb-6 max-w-sm text-muted-foreground">
              {searchQuery
                ? `No games match "${searchQuery}". Try a different search.`
                : "You haven't created any games yet. Start creating!"}
            </p>
            <Button asChild>
              <Link href="/create">{searchQuery ? "Create a Game" : "Create Your First Game"}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
