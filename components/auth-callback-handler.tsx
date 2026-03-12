"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthCallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if there's a stored redirect URL from the auth dialog
    const redirectUrl = sessionStorage.getItem("auth_redirect");
    if (redirectUrl && redirectUrl !== "/") {
      sessionStorage.removeItem("auth_redirect");
      router.push(redirectUrl);
    }
  }, [router]);

  return null;
}
