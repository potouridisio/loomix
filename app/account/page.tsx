"use client";

import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { AppGridBackground } from "@/components/app-grid-background";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser, updateUserProfile, updateUserEmail } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    displayName: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          router.push("/");
          return;
        }

        setProfile({
          displayName: user.user_metadata?.name || user.email?.split("@")[0] || "",
          username: user.user_metadata?.username || "",
          email: user.email || "",
        });
      } catch {
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const { error: profileError } = await updateUserProfile(profile.displayName, profile.username);
      if (profileError) {
        setError(profileError.message);
        setIsSaving(false);
        return;
      }

      const { error: emailError } = await updateUserEmail(profile.email);
      if (emailError) {
        setError(emailError.message);
        setIsSaving(false);
        return;
      }
    } catch {
      setError("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative z-0 flex-1 px-4 py-6 pt-20 sm:px-6 md:pt-8">
        <AppGridBackground className="opacity-[0.04]!" />

        <div className="mx-auto max-w-2xl space-y-6">
          {/* Profile Section */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your public profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="size-20">
                    <AvatarImage src={avatarUrl || "/placeholder-user.jpg"} alt="Profile" />
                    <AvatarFallback className="bg-primary/10 text-xl text-primary">
                      {profile.displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={handleAvatarClick}
                    className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Camera className="size-4" />
                  </button>
                </div>
                <div>
                  <p className="font-medium">{profile.displayName || "User"}</p>
                  <p className="text-sm text-muted-foreground">
                    @{profile.username || "username"}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profile.displayName}
                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                {isSaving && <Loader2 className="size-4 animate-spin" />}
                {isSaving ? "Saving Changes" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove all your data including all your games from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
