"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string; initials: string } | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  redirectTo: string | null;
  setRedirectTo: (url: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; initials: string } | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    // Simulate login
    const name = email.split("@")[0];
    const initials = name.slice(0, 2).toUpperCase();
    setUser({ name, email, initials });
    setIsLoggedIn(true);
    setShowAuthDialog(false);
    if (redirectTo) {
      router.push(redirectTo);
      setRedirectTo(null);
    }
  };

  const signup = (name: string, email: string, password: string) => {
    // Simulate signup
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    setUser({ name, email, initials });
    setIsLoggedIn(true);
    setShowAuthDialog(false);
    if (redirectTo) {
      router.push(redirectTo);
      setRedirectTo(null);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signup,
        logout,
        showAuthDialog,
        setShowAuthDialog,
        authMode,
        setAuthMode,
        redirectTo,
        setRedirectTo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
