"use client";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function signUpWithEmail(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  return { data, error };
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data.user;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
    },
  });

  return { data, error };
}

export async function updateUserProfile(displayName: string, username: string) {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      name: displayName,
      username,
    },
  });

  return { data, error };
}

export async function updateUserEmail(email: string) {
  const { data, error } = await supabase.auth.updateUser({
    email,
  });

  return { data, error };
}
