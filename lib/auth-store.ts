import type { User } from "@supabase/supabase-js";

import { create } from "zustand";

interface AuthStore {
  // User state (hydrated from server)
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Dialog state
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  redirectTo: string | null;
  setRedirectTo: (url: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  showAuthDialog: false,
  setShowAuthDialog: (show) => set({ showAuthDialog: show }),
  authMode: "login",
  setAuthMode: (mode) => set({ authMode: mode }),
  redirectTo: null,
  setRedirectTo: (url) => set({ redirectTo: url }),
}));

// Helper to get display info from user
export function getUserDisplayInfo(user: User | null) {
  if (!user) return null;
  return {
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
    email: user.email || "",
    initials: (user.user_metadata?.full_name || user.email?.split("@")[0] || "U")
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
  };
}
