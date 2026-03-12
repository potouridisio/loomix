"use client";

import {
  Clapperboard,
  Clock,
  Download,
  Eye,
  Gamepad2,
  Globe,
  GlobeLock,
  MoreVertical,
  Play,
  Share2,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface LibraryGame {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  lastPlayed: string | null;
  plays: number;
  status: "published" | "draft";
  rating?: number;
  isNew?: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function LibraryGameCard({
  game,
  viewMode,
}: {
  game: LibraryGame;
  viewMode: "grid" | "list";
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    // TODO: Implement actual delete logic
    setShowDeleteDialog(false);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/game/${game.id}`;
    navigator.clipboard.writeText(url);
  };

  const handlePublish = () => {
    // TODO: Implement actual publish logic
  };

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden border-border/50 bg-card/50 p-0 transition-colors hover:bg-card">
        <div className="flex w-full items-center gap-3 overflow-hidden p-3 sm:gap-4 sm:p-4">
          {/* Thumbnail */}
          <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-primary/20 via-accent to-secondary sm:size-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <Gamepad2 className="size-6 text-primary/50 sm:size-8" />
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="max-w-30 truncate text-sm font-semibold sm:max-w-50 sm:text-base md:max-w-none">
                {game.title}
              </h4>
              <Badge
                variant={game.status === "published" ? "default" : "secondary"}
                className={cn(
                  "hidden shrink-0 text-xs sm:inline-flex",
                  game.status === "published" && "bg-primary/20 text-primary",
                )}
              >
                {game.status === "published" ? "Published" : "Draft"}
              </Badge>
            </div>
            <p className="max-w-37.5 truncate text-xs text-muted-foreground sm:max-w-62.5 sm:text-sm md:max-w-none">
              {game.description}
            </p>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground sm:mt-2 sm:gap-4">
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                <span className="hidden sm:inline">{formatDate(game.createdAt)}</span>
                <span className="sm:hidden">
                  {new Date(game.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </span>
              {game.status === "published" && !game.isNew && (
                <div className="flex items-center gap-2">
                  {game.rating && (
                    <span className="flex items-center gap-0.5">
                      <Star className="size-3 fill-muted-foreground text-muted-foreground" />
                      {game.rating.toFixed(1)}
                    </span>
                  )}
                  <span className="flex items-center gap-0.5">
                    <Eye className="size-3" />
                    {game.plays}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button size="sm" className="hidden gap-2 sm:inline-flex" asChild>
              <Link href={`/game/${game.id}`}>
                <Play className="size-3.5" />
                Play
              </Link>
            </Button>
            <Button size="icon-sm" className="sm:hidden" asChild>
              <Link href={`/game/${game.id}`}>
                <Play className="size-3.5" />
              </Link>
            </Button>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">More</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <Clapperboard className="size-4" />
                  Edit
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                    Soon
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handlePublish}>
                  {game.status === "published" ? (
                    <GlobeLock className="size-4" />
                  ) : (
                    <Globe className="size-4" />
                  )}
                  {game.status === "published" ? "Unpublish" : "Publish"}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleShare}>
                  <Share2 className="size-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Download className="size-4" />
                  Download
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                    Soon
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={() => setShowDeleteDialog(true)}>
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete game</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{game.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    );
  }

  return (
    <Card
      className="group flex flex-col gap-0 overflow-hidden border-border/50 bg-card/50 p-0 transition-all duration-300 hover:border-primary/50 hover:bg-card"
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
        <Link
          href={`/game/${game.id}`}
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-background/80 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button size="lg" className="gap-2">
            <Play className="size-4" />
            Play Now
          </Button>
        </Link>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={game.status === "published" ? "default" : "secondary"}
            className={cn(game.status === "published" && "bg-primary text-primary-foreground")}
          >
            {game.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>

        {/* Menu */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">More</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                <Clapperboard className="size-4" />
                Edit
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                  Soon
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handlePublish}>
                {game.status === "published" ? (
                  <GlobeLock className="size-4" />
                ) : (
                  <Globe className="size-4" />
                )}
                {game.status === "published" ? "Unpublish" : "Publish"}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleShare}>
                <Share2 className="size-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Download className="size-4" />
                Download
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                  Soon
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={() => setShowDeleteDialog(true)}>
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-4">
        <h4 className="mb-1 truncate font-semibold text-foreground transition-colors group-hover:text-primary">
          {game.title}
        </h4>
        <p className="mb-3 line-clamp-2 min-h-10 text-sm text-muted-foreground">
          {game.description}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {formatDate(game.createdAt)}
          </span>
          {game.status === "published" && !game.isNew && (
            <div className="flex items-center gap-2">
              {game.rating && (
                <span className="flex items-center gap-0.5">
                  <Star className="size-3 fill-muted-foreground text-muted-foreground" />
                  {game.rating.toFixed(1)}
                </span>
              )}
              <span className="flex items-center gap-0.5">
                <Eye className="size-3" />
                {game.plays}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete game</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{game.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
