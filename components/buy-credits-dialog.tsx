"use client";

import { Coins } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
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

const creditPacks = [
  { credits: 10, price: "$5" },
  { credits: 25, price: "$10" },
  { credits: 50, price: "$18", bestValue: true },
];

interface BuyCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase?: (credits: number) => void;
}

export function BuyCreditsDialog({ open, onOpenChange, onPurchase }: BuyCreditsDialogProps) {
  const [selectedCreditPack, setSelectedCreditPack] = useState<number>(50);

  const handlePurchase = () => {
    onPurchase?.(selectedCreditPack);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Credits</DialogTitle>
          <DialogDescription>Purchase additional game generation credits.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3 py-4">
          {creditPacks.map((pack) => (
            <button
              key={pack.credits}
              onClick={() => setSelectedCreditPack(pack.credits)}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                selectedCreditPack === pack.credits
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary hover:bg-primary/5",
              )}
            >
              {pack.bestValue && (
                <Badge className="absolute -top-2.5 px-1.5 py-0.5 text-[10px]">Best Value</Badge>
              )}
              <Coins className="size-6 text-primary" />
              <span className="text-lg font-bold">{pack.credits}</span>
              <span className="text-xs text-muted-foreground">credits</span>
              <span className="font-medium text-primary">{pack.price}</span>
            </button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="gap-2" onClick={handlePurchase}>
            <Coins className="size-4" />
            Purchase Credits
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
