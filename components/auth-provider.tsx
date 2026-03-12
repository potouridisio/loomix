"use client";

import type { User } from "@supabase/supabase-js";

import { useEffect, useRef } from "react";

import { useAuthStore } from "@/lib/auth-store";
import { createClient } from "@/lib/supabase/client";

interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const initialized = useRef(false);

  // Hydrate store with server-fetched user
  useEffect(() => {
    if (!initialized.current) {
      setUser(user);
      initialized.current = true;
    }
  }, [user, setUser]);

  // Listen for auth state changes
  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}
