"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GameRatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GameRatingDialog({ open, onOpenChange }: GameRatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      // TODO: Submit rating to backend
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Rate this game</DialogTitle>
          <DialogDescription>Your feedback helps Loomix surface better games.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="rounded p-1 transition-transform hover:scale-110 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Star
                  className={cn(
                    "size-8 transition-colors",
                    (hoverRating || rating) >= star
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30 hover:text-primary/50",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
        <DialogFooter className="flex-row gap-2 sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Not now
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
