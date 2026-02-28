"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  GamepadDirectional,
  Home,
  Library,
  WandSparkles,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  const data = {
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: pathname === "/",
      },
      {
        title: "Explore",
        url: "/explore",
        icon: Compass,
        isActive: pathname === "/explore",
      },
      {
        title: "Create",
        url: "/create",
        icon: WandSparkles,
        isActive: pathname === "/create",
      },
      {
        title: "Library",
        url: "/library",
        icon: Library,
        isActive: pathname === "/library",
      },
    ],
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GamepadDirectional className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Loomix</span>
                  <span className="">Free</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
