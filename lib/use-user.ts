"use client";

import type { User } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { createClient } from "@/lib/supabase/client";

export function useUser() {
  const supabase = createClient();
  
  const { data: user, error, isLoading, mutate } = useSWR<User | null>(
    "user",
    async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      mutate(session?.user ?? null, false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, mutate]);

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

  return {
    user,
    userDisplayInfo,
    isLoggedIn: !!user,
    isLoading,
    error,
    mutate,
  };
}
