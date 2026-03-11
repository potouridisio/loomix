"use client";

import { Check, Zap, Sparkles, Crown, CreditCard, Coins } from "lucide-react";
import { useState } from "react";

import { AppGridBackground } from "@/components/app-grid-background";
import { BuyCreditsDialog } from "@/components/buy-credits-dialog";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const plans = {
  free: {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out Loomix",
    features: [
      "5 generation credits / month",
      "Core templates",
      "Basic styles",
      "Play & share games",
    ],
  },
  pro: {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For serious game creators",
    features: [
      "50 credits / month",
      "All templates",
      "All styles",
      "Advanced mechanics",
      "Buy additional credits",
    ],
    popular: true,
  },
};

export default function BillingPage() {
  // Simulate user's current plan - toggle to see both states
  const [currentPlan, setCurrentPlan] = useState<"free" | "pro">("free");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [showBuyCreditsDialog, setShowBuyCreditsDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleBillingPeriodChange = (period: "monthly" | "yearly") => {
    setBillingPeriod(period);
  };

  const handleUpdateCard = () => {
    setShowPaymentDialog(false);
  };

  const handleCancelPlan = () => {
    setShowCancelDialog(false);
    setCurrentPlan("free");
  };

  const handleSwitchToYearly = () => {
    setShowSubscriptionDialog(false);
  };

  const yearlyPrice = "$7";
  const yearlySaving = "22%";

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative z-0 flex-1 px-4 py-6 pt-20 sm:px-6 md:pt-8">
        {/* App Grid Background */}
        <AppGridBackground className="opacity-[0.04]!" />

        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              {currentPlan === "free" ? "Upgrade Your Plan" : "Manage Your Subscription"}
            </h2>
            <p className="text-muted-foreground">
              {currentPlan === "free"
                ? "Unlock unlimited game creation with Loomix Pro"
                : "You are currently on the Pro plan"}
            </p>
          </div>

          {/* Billing Period Toggle (only show for free users) */}
          {currentPlan === "free" && (
            <div className="mb-8 flex items-center justify-center gap-4">
              <button
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  billingPeriod === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => handleBillingPeriodChange("monthly")}
              >
                Monthly
              </button>
              <button
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  billingPeriod === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => handleBillingPeriodChange("yearly")}
              >
                Yearly
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    billingPeriod === "yearly"
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/20 text-primary",
                  )}
                >
                  Save {yearlySaving}
                </Badge>
              </button>
            </div>
          )}

          {/* Plans */}
          {currentPlan === "free" ? (
            <div className="grid items-stretch gap-6 md:grid-cols-2">
              {/* Free Plan */}
              <Card className="flex h-full flex-col border-border/50 bg-card/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Free</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plans.free.price}</span>
                    <span className="text-muted-foreground">/{plans.free.period}</span>
                  </div>
                  <CardDescription>{plans.free.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <ul className="space-y-3">
                    {plans.free.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm">
                        <Check className="size-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto flex-col gap-3">
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                  <p className="invisible text-xs text-muted-foreground">Cancel anytime</p>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="relative flex h-full flex-col border-primary bg-card">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1.5 bg-primary px-3 py-1">
                    <Sparkles className="size-3" />
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Crown className="size-5 text-primary" />
                      Pro
                    </CardTitle>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      {billingPeriod === "monthly" ? plans.pro.price : yearlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>{plans.pro.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <ul className="space-y-3">
                    {plans.pro.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm">
                        <Check className="size-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Button className="w-full gap-2" onClick={() => setCurrentPlan("pro")}>
                    <Zap className="size-4" />
                    Upgrade to Pro
                  </Button>
                  <p className="text-xs text-muted-foreground">Cancel anytime</p>
                </CardFooter>
              </Card>
            </div>
          ) : (
            /* Pro User View */
            <div className="space-y-6">
              {/* Current Plan Card */}
              <Card className="border-primary bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                        <Crown className="size-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Loomix Pro</CardTitle>
                        <CardDescription>Your subscription is active</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Credits</p>
                      <p className="text-2xl font-bold">150</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Price</p>
                      <p className="text-2xl font-bold">{plans.pro.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Billing Date</p>
                      <p className="text-2xl font-bold">Apr 3, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Games Generated</p>
                      <p className="text-2xl font-bold">47 this month</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => setShowBuyCreditsDialog(true)}
                  >
                    <Coins className="size-4" />
                    Buy Credits
                  </Button>
                  <Button variant="outline" onClick={() => setShowSubscriptionDialog(true)}>
                    Manage Subscription
                  </Button>
                  <Button variant="outline" onClick={() => setShowPaymentDialog(true)}>
                    Update Payment Method
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setShowCancelDialog(true)}
                  >
                    Cancel Plan
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Features */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle>Your Pro Benefits</CardTitle>
                  <CardDescription>All the features included in your subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {plans.pro.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3"
                      >
                        <Check className="size-5 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* FAQ or Support Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Have questions about billing?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Update Payment Method Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
            <DialogDescription>Enter your new card details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" placeholder="John Doe" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button className="gap-2" onClick={handleUpdateCard}>
              <CreditCard className="size-4" />
              Update Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Subscription Dialog */}
      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Subscription</DialogTitle>
            <DialogDescription>Review and manage your Loomix Pro subscription.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-muted-foreground">Loomix Pro Monthly</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">Billing Cycle</p>
                <p className="text-sm text-muted-foreground">Monthly ($19/month)</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSwitchToYearly}>
                Switch to Yearly
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">Next Payment</p>
                <p className="text-sm text-muted-foreground">Apr 3, 2026</p>
              </div>
              <span className="text-sm font-medium">$19.00</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubscriptionDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Buy Credits Dialog */}
      <BuyCreditsDialog open={showBuyCreditsDialog} onOpenChange={setShowBuyCreditsDialog} />

      {/* Cancel Plan Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your Loomix Pro subscription? You will lose access to
              all Pro features at the end of your current billing period.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelPlan}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
