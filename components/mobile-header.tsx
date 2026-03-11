"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border/50 bg-background/95 px-4 backdrop-blur md:hidden">
      <SidebarTrigger className="-ml-1" />
    </header>
  );
}
