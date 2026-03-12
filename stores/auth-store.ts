import { create } from "zustand";

function setRedirectCookie(url: string | null) {
  if (typeof document === "undefined") return;
  if (url) {
    document.cookie = `auth_redirect=${encodeURIComponent(url)}; path=/; max-age=300; SameSite=Lax`;
  } else {
    document.cookie = "auth_redirect=; path=/; max-age=0";
  }
}

interface AuthDialogStore {
  isOpen: boolean;
  mode: "login" | "signup";
  redirectTo: string | null;
  openDialog: (mode?: "login" | "signup", redirectTo?: string | null) => void;
  closeDialog: () => void;
  setMode: (mode: "login" | "signup") => void;
  setRedirectTo: (url: string | null) => void;
}

export const useAuthDialogStore = create<AuthDialogStore>((set) => ({
  isOpen: false,
  mode: "login",
  redirectTo: null,
  openDialog: (mode = "login", redirectTo = null) => {
    setRedirectCookie(redirectTo);
    return set({ isOpen: true, mode, redirectTo });
  },
  closeDialog: () => set({ isOpen: false }),
  setMode: (mode) => set({ mode }),
  setRedirectTo: (redirectTo) => {
    setRedirectCookie(redirectTo);
    return set({ redirectTo });
  },
}));

