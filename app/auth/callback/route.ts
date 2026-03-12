import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  
  // Read redirect from cookie
  const cookieStore = await cookies();
  let next = cookieStore.get("auth_redirect")?.value;
  if (next) {
    next = decodeURIComponent(next);
  }
  
  if (!next || !next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      
      // Clear the redirect cookie
      const response = isLocalEnv
        ? NextResponse.redirect(`${origin}${next}`)
        : forwardedHost
          ? NextResponse.redirect(`https://${forwardedHost}${next}`)
          : NextResponse.redirect(`${origin}${next}`);
      
      response.cookies.set("auth_redirect", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
