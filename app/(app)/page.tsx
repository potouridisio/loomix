import type { Metadata } from "next"
import { Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { GameCard, type Game } from "@/components/game-card"
import { TemplateCard, type Template } from "@/components/template-card"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Generate playable 2D games with AI. Play instantly and bring your ideas to life with Loomix.",
}

const trendingGames: Game[] = [
  { id: "1", title: "Neon Dungeon Escape", creator: "PixelAlex", username: "@pixelalex", plays: 145200, likes: 8420, tag: "Top-down" },
  { id: "2", title: "Cyber Runner 2084", creator: "GameDev42", username: "@gamedev42", plays: 98300, likes: 5610, tag: "Endless" },
  { id: "3", title: "Crystal Caves", creator: "IndieJay", username: "@indiejay", plays: 87600, likes: 4230, tag: "Platformer" },
  { id: "4", title: "Space Blaster X", creator: "Astro", username: "@astrogames", plays: 76400, likes: 3890, tag: "Shooter" },
  { id: "5", title: "Puzzle Dimension", creator: "LogicMind", username: "@logicmind", plays: 65200, likes: 3450, tag: "Puzzle" },
  { id: "6", title: "Dragon Quest Mini", creator: "RPGFan", username: "@rpgfan", plays: 54100, likes: 2980, tag: "RPG" },
  { id: "7", title: "Shadow Depths", creator: "DarkPixel", username: "@darkpixel", plays: 48700, likes: 2760, tag: "Dungeon" },
  { id: "8", title: "Mystic Forest", creator: "NatureDev", username: "@naturedev", plays: 42300, likes: 2340, tag: "Adventure" },
]

const newGames: Game[] = [
  { id: "9", title: "Retro Racers", creator: "SpeedKing", username: "@speedking", plays: 1240, likes: 89, tag: "Endless" },
  { id: "10", title: "Tower Defense Pro", creator: "StrategyX", username: "@strategyx", plays: 980, likes: 67, tag: "Top-down" },
  { id: "11", title: "Bounce Ball", creator: "SimpleFun", username: "@simplefun", plays: 756, likes: 45, tag: "Platformer" },
  { id: "12", title: "Alien Invasion", creator: "SciFiDev", username: "@scifidev", plays: 623, likes: 38, tag: "Shooter" },
  { id: "13", title: "Match Master", creator: "PuzzleKing", username: "@puzzleking", plays: 512, likes: 31, tag: "Puzzle" },
  { id: "14", title: "Knight's Journey", creator: "MedievalFan", username: "@medievalfan", plays: 445, likes: 27, tag: "RPG" },
  { id: "15", title: "Loot Quest", creator: "TreasureX", username: "@treasurex", plays: 389, likes: 24, tag: "Dungeon" },
  { id: "16", title: "Ocean Explorer", creator: "SeaLover", username: "@sealover", plays: 298, likes: 18, tag: "Adventure" },
]

const templates: Template[] = [
  { id: "1", title: "Top-down RPG Starter", description: "Classic 2D RPG with movement, NPCs, and dialogue system." },
  { id: "2", title: "Platformer Base", description: "Side-scrolling platformer with jump, run, and collectibles." },
  { id: "3", title: "Space Shooter Kit", description: "Vertical shooter with enemies, power-ups, and scoring." },
  { id: "4", title: "Puzzle Game Framework", description: "Grid-based puzzle with match mechanics and levels." },
]

const suggestionChips = [
  "Pixel Platformer",
  "Endless Runner",
  "Dungeon Crawler",
  "Space Shooter",
  "Puzzle Game",
]

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 pb-12 pt-4 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Create 2D Games with AI
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            Describe your idea and generate a playable game instantly.
          </p>
        </div>

        <Card className="w-full max-w-2xl gap-4 p-4">
          <Textarea
            placeholder="Top-down pixel RPG set in a neon cyberpunk city"
            className="min-h-24 resize-none border-0 text-base shadow-none focus-visible:ring-0"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {suggestionChips.map((chip) => (
                <Badge
                  key={chip}
                  variant="secondary"
                  className="cursor-pointer transition-colors hover:bg-secondary/80"
                >
                  {chip}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Sparkles className="size-4" />
                Surprise Me
              </Button>
              <Button size="sm">Generate Game</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Trending Games Section */}
      <section className="flex flex-col gap-6 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Trending</h2>
          <Button variant="link" className="h-auto p-0 text-muted-foreground">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trendingGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* New Games Section */}
      <section className="flex flex-col gap-6 py-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-foreground">New</h2>
          <p className="text-sm text-muted-foreground">Recently generated by the community</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Templates Section */}
      <section className="flex flex-col gap-6 py-8">
        <h2 className="text-2xl font-semibold text-foreground">Templates</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </main>
  )
}
