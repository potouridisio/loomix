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

export async function updateUserProfile(displayName: string) {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      name: displayName,
    },
  });

  return { data, error };
}

export async function deleteAccount() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: new Error("Not authenticated") };

  // Sign out the user - full account deletion requires a Supabase Edge Function
  // or database trigger. For now, we just sign out.
  // To fully delete: create a "delete_user" Edge Function or RPC in Supabase
  await supabase.auth.signOut();
  return { error: null };
}

export async function updateUserEmail(email: string) {
  const { data, error } = await supabase.auth.updateUser({
    email,
  });

  return { data, error };
}

export async function uploadAvatar(file: File) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: new Error("Not authenticated"), url: null };

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) return { error: uploadError, url: null };

  const { data: { publicUrl } } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  // Update user metadata with avatar URL
  await supabase.auth.updateUser({
    data: { avatar_url: publicUrl },
  });

  return { error: null, url: publicUrl };
}

export function getAvatarUrl(user: any): string | null {
  // Check for avatar in user metadata first (uploaded avatar)
  if (user?.user_metadata?.avatar_url) {
    return user.user_metadata.avatar_url;
  }
  // Fall back to OAuth provider avatar (Google, etc.)
  if (user?.user_metadata?.picture) {
    return user.user_metadata.picture;
  }
  if (user?.user_metadata?.avatar_url) {
    return user.user_metadata.avatar_url;
  }
  return null;
}
