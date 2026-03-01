import { Play, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface Game {
  id: string
  title: string
  creator: string
  username: string
  plays: number
  likes: number
  tag: string
}

function formatCount(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  }
  return num.toString()
}

const tagGradients: Record<string, string> = {
  "Top-down": "from-violet-600 to-indigo-600",
  "Platformer": "from-emerald-500 to-teal-600",
  "Endless": "from-orange-500 to-red-500",
  "Puzzle": "from-blue-500 to-cyan-500",
  "Shooter": "from-rose-500 to-pink-600",
  "RPG": "from-purple-500 to-violet-600",
  "Dungeon": "from-amber-600 to-orange-600",
  "Adventure": "from-sky-500 to-blue-600",
}

export function GameCard({ game }: { game: Game }) {
  const gradientClass = tagGradients[game.tag] || "from-slate-600 to-slate-700"

  return (
    <Card className="gap-0 overflow-hidden border-0 p-0 shadow-md transition-shadow hover:shadow-lg">
      <div className={`relative aspect-video w-full bg-gradient-to-br ${gradientClass}`}>
        <span className="absolute left-2 top-2 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
          {game.tag}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h3 className="line-clamp-1 font-semibold text-foreground">{game.title}</h3>
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${game.creator}`} alt={game.creator} />
            <AvatarFallback>{game.creator.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{game.username}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1 text-sm">
              <Play className="size-3.5" />
              {formatCount(game.plays)}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <Heart className="size-3.5" />
              {formatCount(game.likes)}
            </span>
          </div>
          <Button size="sm">Play</Button>
        </div>
      </div>
    </Card>
  )
}
