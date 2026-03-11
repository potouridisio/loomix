import { Gamepad2 } from "lucide-react";

import { AppGridBackground } from "@/components/app-grid-background";
import { GameCard } from "@/components/game-card";
import { GamePromptInput } from "@/components/game-prompt-input";
import { SpaceBackground } from "@/components/space-background";

const trendingGames = [
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
    description: "High-speed racing through neon cityscapes",
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
];

const topGames = [
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
    description: "Build and defend your medieval castle",
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
];

const newGames = [
  {
    id: "9",
    title: "Robot Factory",
    description: "Manage your robot production line",
    thumbnail: "/games/robot-factory.jpg",
    plays: 1200,
    author: "TechBuilder",
    genre: "Puzzle",
    isNew: true,
  },
  {
    id: "10",
    title: "Magic Cards",
    description: "A strategic card battle game",
    thumbnail: "/games/magic-cards.jpg",
    plays: 890,
    author: "CardMaster",
    genre: "Puzzle",
    isNew: true,
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
  },
  {
    id: "12",
    title: "Garden Grow",
    description: "Grow the most beautiful garden",
    thumbnail: "/games/garden-grow.jpg",
    plays: 420,
    author: "GreenThumb",
    genre: "Puzzle",
    isNew: true,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <div className="relative z-0 flex-1 px-4 py-6 pt-14 sm:px-6 md:pt-6">
        {/* Space Background */}
        <SpaceBackground />

        {/* App Grid Background */}
        <AppGridBackground />

        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <section className="relative mx-auto mb-16 max-w-3xl overflow-visible pt-8 pb-4 text-center md:pt-12">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <span className="font-mono tracking-wide">Prompt → Playable game</span>
              </div>
            </div>
            <h2 className="relative mb-6 text-4xl font-bold tracking-tight text-balance text-[#f8f8f8] md:text-5xl lg:text-6xl">
              Create playable{" "}
              <span className="text-[#a1a8ff] [text-shadow:2px_2px_0_rgba(115,125,255,0.9),4px_4px_0_rgba(115,125,255,0.28),0_0_8px_rgba(115,125,255,0.12)]">
                {" "}
                games
              </span>{" "}
              with AI
            </h2>
            <p className="relative mb-8 text-lg text-pretty text-muted-foreground">
              Describe your game idea and watch it come to life. No coding required.
            </p>
            <div className="relative">
              <GamePromptInput />
            </div>
          </section>

          {/* Trending Games */}
          {trendingGames.length > 0 && (
            <section className="mb-12">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Trending Now</h3>
                <a href="/explore?sort=trending" className="text-sm text-primary hover:underline">
                  View all
                </a>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {trendingGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          )}

          {/* Top Games */}
          {topGames.length > 0 && (
            <section className="mb-12">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Top Games</h3>
                <a href="/explore?sort=popular" className="text-sm text-primary hover:underline">
                  View all
                </a>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {topGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          )}

          {/* New Games */}
          {newGames.length > 0 && (
            <section className="mb-12">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Just Released</h3>
                <a href="/explore?sort=newest" className="text-sm text-primary hover:underline">
                  View all
                </a>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {newGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          )}

          {/* Empty State - Show when all sections are empty */}
          {trendingGames.length === 0 && topGames.length === 0 && newGames.length === 0 && (
            <section className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Gamepad2 className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No games yet</h3>
              <p className="mb-6 max-w-sm text-muted-foreground">
                Be the first to create a game and share it with the community!
              </p>
              <a
                href="/create"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Create Your First Game
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
