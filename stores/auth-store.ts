import { create } from "zustand";

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
    if (redirectTo && typeof window !== "undefined") {
      sessionStorage.setItem("auth_redirect", redirectTo);
    }
    return set({ isOpen: true, mode, redirectTo });
  },
  closeDialog: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth_redirect");
    }
    return set({ isOpen: false, redirectTo: null });
  },
  setMode: (mode) => set({ mode }),
  setRedirectTo: (redirectTo) => {
    if (redirectTo && typeof window !== "undefined") {
      sessionStorage.setItem("auth_redirect", redirectTo);
    }
    return set({ redirectTo });
  },
}));

