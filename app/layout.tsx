import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono, Inter } from "next/font/google";
import { cookies } from "next/headers";

import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthDialog } from "@/components/auth-dialog";
import { AuthProvider } from "@/components/auth-provider";
import { MobileHeader } from "@/components/mobile-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loomix - AI Game Generator",
  description: "Create playable 2D games with AI. The Suno for games.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarState !== "false";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable}  font-mono antialiased`}>
        <AuthProvider user={user}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset>
              <MobileHeader />
              <ScrollArea className="h-dvh">
                <div className="min-h-full">{children}</div>
              </ScrollArea>
            </SidebarInset>
          </SidebarProvider>
          <AuthDialog />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
