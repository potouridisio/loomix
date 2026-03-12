"use client";

import type { User } from "@supabase/supabase-js";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  userDisplayInfo: { name: string; email: string; initials: string } | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (name: string, email: string, password: string) => Promise<{ error: string | null; needsConfirmation?: boolean }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  redirectTo: string | null;
  setRedirectTo: (url: string | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user && redirectTo) {
        router.push(redirectTo);
        setRedirectTo(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router, redirectTo]);

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    setShowAuthDialog(false);
    if (redirectTo) {
      router.push(redirectTo);
      setRedirectTo(null);
    }
    return { error: null };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ error: string | null; needsConfirmation?: boolean }> => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || 
          `${window.location.origin}/`,
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      return { error: null, needsConfirmation: true };
    }

    setShowAuthDialog(false);
    if (redirectTo) {
      router.push(redirectTo);
      setRedirectTo(null);
    }
    return { error: null };
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const userDisplayInfo = user ? {
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
    email: user.email || "",
    initials: (user.user_metadata?.full_name || user.email?.split("@")[0] || "U")
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
  } : null;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        userDisplayInfo,
        login,
        signup,
        loginWithGoogle,
        logout,
        showAuthDialog,
        setShowAuthDialog,
        authMode,
        setAuthMode,
        redirectTo,
        setRedirectTo,
        isLoading,
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
