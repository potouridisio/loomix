import {
  ArrowLeft,
  Download,
  ExternalLink,
  MoreHorizontal,
  Share2,
  Star,
  Eye,
  Info,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppGridBackground } from "@/components/app-grid-background";
import { GamePlayer } from "@/components/game-player";
import { ShareButton } from "@/components/share-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getGameById } from "@/lib/games-data";

interface PlayPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { id } = await params;
  const game = getGameById(id);

  if (!game) {
    notFound();
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="relative z-0 flex items-center justify-between border-b border-border/50 px-4 py-3">
        {/* App Grid Background */}
        <AppGridBackground className="opacity-[0.04]!" />

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/library">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            {/* Desktop: HoverCard on title */}
            <div className="hidden items-center gap-2 md:flex">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <h1 className="flex cursor-pointer items-center gap-2.5 font-semibold transition-colors hover:text-primary">
                    {game.title}
                    <Info className="size-4 text-muted-foreground" />
                  </h1>
                </HoverCardTrigger>
                <HoverCardContent align="start" className="w-64 p-3">
                  <div className="space-y-3">
                    {!game.isNew && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="size-3.5 fill-primary text-primary" />
                          <span className="font-medium">4.2</span>
                          <span className="text-muted-foreground">(128)</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="size-3.5" />
                          <span>12.5K plays</span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {game.genre && (
                        <Badge variant="outline" className="text-xs">
                          {game.genre}
                        </Badge>
                      )}
                      {game.style && (
                        <Badge variant="outline" className="text-xs">
                          {game.style}
                        </Badge>
                      )}
                      {game.difficulty && (
                        <Badge variant="outline" className="text-xs">
                          {game.difficulty}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">by {game.creator}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              {game.isNew && (
                <Badge variant="secondary" className="text-xs">
                  New
                </Badge>
              )}
            </div>

            {/* Mobile: Popover button on title */}
            <div className="flex items-center gap-2 md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2.5 font-semibold transition-colors hover:text-primary">
                    {game.title}
                    <Info className="size-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-3">
                  <div className="space-y-3">
                    {!game.isNew && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="size-3.5 fill-primary text-primary" />
                          <span className="font-medium">4.2</span>
                          <span className="text-muted-foreground">(128)</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="size-3.5" />
                          <span>12.5K plays</span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {game.genre && (
                        <Badge variant="outline" className="text-xs">
                          {game.genre}
                        </Badge>
                      )}
                      {game.style && (
                        <Badge variant="outline" className="text-xs">
                          {game.style}
                        </Badge>
                      )}
                      {game.difficulty && (
                        <Badge variant="outline" className="text-xs">
                          {game.difficulty}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">by {game.creator}</p>
                  </div>
                </PopoverContent>
              </Popover>
              {game.isNew && (
                <Badge variant="secondary" className="text-xs">
                  New
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Desktop buttons */}
          <ShareButton
            url={`/play/${id}`}
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
          />
          <Button variant="outline" size="sm" className="hidden gap-2 md:inline-flex" disabled>
            <Download className="size-4" />
            Download
            <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
              Soon
            </Badge>
          </Button>
          <Button variant="outline" size="sm" className="hidden gap-2 md:inline-flex" asChild>
            <a href={`/play/${id}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4" />
              Open in New Tab
            </a>
          </Button>

          {/* Mobile/Tablet dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
              <DropdownMenuItem asChild>
                <a href={`/play/${id}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  Open in New Tab
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1">
        <GamePlayer game={game} />
      </div>
    </div>
  );
}
