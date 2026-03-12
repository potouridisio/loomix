import { create } from "zustand";

interface AuthDialogState {
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  redirectTo: string | null;
  setRedirectTo: (url: string | null) => void;
}

export const useAuthDialog = create<AuthDialogState>((set) => ({
  showAuthDialog: false,
  setShowAuthDialog: (show) => set({ showAuthDialog: show }),
  authMode: "login",
  setAuthMode: (mode) => set({ authMode: mode }),
  redirectTo: null,
  setRedirectTo: (url) => set({ redirectTo: url }),
}));
