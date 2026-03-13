"use client";

import { Camera, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";

export default function AccountPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    displayName: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    bio: "Game creator and enthusiast. Love making platformers and puzzle games.",
  });
  // Preferences state - will be implemented later
  // const [preferences, setPreferences] = useState({
  //   emailNotifications: true,
  //   marketingEmails: false,
  //   publicProfile: true,
  //   showActivity: true,
  // })
  // const [appearance, setAppearance] = useState({
  //   theme: "dark",
  //   language: "en",
  // });

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

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative z-0 flex-1 px-4 py-6 pt-20 sm:px-6 md:pt-8">
        {/* App Grid Background */}
        <AppGridBackground className="opacity-[0.04]!" />

        <div className=" mx-auto max-w-2xl space-y-6">
          {/* Profile Section */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your public profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="size-20">
                    <AvatarImage src={avatarUrl || "/placeholder-user.jpg"} alt="Profile" />
                    <AvatarFallback className="bg-primary/10 text-xl text-primary">
                      JD
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
                  <p className="font-medium">{profile.displayName}</p>
                  <p className="text-sm text-muted-foreground">@{profile.username}</p>
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

              {/* Bio - Will be implemented later */}
              {/* <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="min-h-24 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {profile.bio.length}/160 characters
                </p>
              </div> */}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                {isSaving && <Loader2 className="size-4 animate-spin" />}
                {isSaving ? "Saving Changes" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          {/* Preferences Section - Will be implemented later */}
          {/* <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your notification and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications" className="text-base">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about your games
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, emailNotifications: checked })
                  }
                />
              </div>

              <Separator className="bg-border" />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketingEmails" className="text-base">
                    Marketing Emails
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new features and offers
                  </p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={preferences.marketingEmails}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, marketingEmails: checked })
                  }
                />
              </div>

              <Separator className="bg-border" />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicProfile" className="text-base">
                    Public Profile
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your profile
                  </p>
                </div>
                <Switch
                  id="publicProfile"
                  checked={preferences.publicProfile}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, publicProfile: checked })
                  }
                />
              </div>

              <Separator className="bg-border" />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showActivity" className="text-base">
                    Show Activity
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Display your recent activity on your profile
                  </p>
                </div>
                <Switch
                  id="showActivity"
                  checked={preferences.showActivity}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, showActivity: checked })
                  }
                />
              </div>
            </CardContent>
          </Card> */}

          {/* Appearance Section - Will be implemented later */}
          {/* <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how Gamepop looks for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={appearance.theme}
                    onValueChange={(value) =>
                      setAppearance({ ...appearance, theme: value })
                    }
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={appearance.language}
                    onValueChange={(value) =>
                      setAppearance({ ...appearance, language: value })
                    }
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card> */}

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
