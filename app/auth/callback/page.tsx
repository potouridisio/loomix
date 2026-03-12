"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient();
      
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        new URL(window.location.href).searchParams.get("code") || ""
      );

      if (error) {
        console.error("[v0] Auth callback error:", error);
        router.push("/");
        return;
      }

      if (data.session) {
        // Session established, redirect to home or the intended page
        router.push("/");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">Signing you in...</h1>
        <p className="text-muted-foreground">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}
