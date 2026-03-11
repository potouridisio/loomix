"use client";

import {
  Home,
  Compass,
  Sparkles,
  Library,
  CreditCard,
  User,
  LogOut,
  ChevronsUpDown,
  Zap,
  Clapperboard,
  LogIn,
  SidebarIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home, requiresAuth: false },
  { title: "Explore", url: "/explore", icon: Compass, requiresAuth: false },
  { title: "Create", url: "/create", icon: Sparkles, requiresAuth: true },
  {
    title: "Studio",
    url: "#",
    icon: Clapperboard,
    comingSoon: true,
    requiresAuth: true,
  },
  { title: "Library", url: "/library", icon: Library, requiresAuth: true },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isLoggedIn, user, logout, setShowAuthDialog, setAuthMode, setRedirectTo } = useAuth();
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isOpen, setOpen] = useState(false);

  const handleNavClick = (item: (typeof mainNavItems)[0], e: React.MouseEvent) => {
    if (item.requiresAuth && !isLoggedIn) {
      e.preventDefault();
      setRedirectTo(item.url);
      setAuthMode("login");
      setShowAuthDialog(true);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/"
                onClick={(event) => {
                  if (isCollapsed) {
                    event.preventDefault();
                    toggleSidebar();
                  }
                }}
              >
                <Tooltip
                  open={isOpen}
                  onOpenChange={(open) => {
                    setOpen(isCollapsed && open);
                  }}
                >
                  <TooltipTrigger asChild>
                    <Button
                      size="icon-sm"
                      className={cn("group/item size-8", !isCollapsed && "hover:bg-primary")}
                      asChild
                    >
                      <div>
                        <Logo
                          size="md"
                          className="group-data-[collapsible=icon]:group-hover/item:hidden"
                        />
                        <SidebarIcon className="hidden size-4 group-data-[collapsible=icon]:group-hover/item:block" />
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Open sidebar</TooltipContent>
                </Tooltip>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="text-sm font-bold">Loomix</span>
                  <span className="text-xs text-muted-foreground">Free</span>
                </div>
              </Link>
            </SidebarMenuButton>
            <SidebarTrigger className="hidden group-data-[collapsible=icon]:hidden md:inline-flex" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.comingSoon}
                    isActive={pathname === item.url}
                    tooltip={item.comingSoon ? `${item.title} (Coming Soon)` : item.title}
                    disabled={item.comingSoon}
                    className={item.comingSoon ? "cursor-not-allowed opacity-60" : ""}
                  >
                    {item.comingSoon ? (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="h-4 px-1.5 py-0 text-[10px] font-normal"
                        >
                          Soon
                        </Badge>
                      </div>
                    ) : (
                      <Link href={item.url} onClick={(e) => handleNavClick(item, e)}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subscribe Card - Only show when logged in */}
        {isLoggedIn && (
          <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
            <Card className="mx-2 border-primary/30 bg-primary/10 p-0 shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="relative flex size-5 items-center justify-center">
                    <span className="absolute size-8 rounded-full bg-primary/20 blur-[10px]" />
                    <span className="absolute size-7 animate-[space-ring_3.2s_ease-out_infinite] rounded-full border border-primary/40" />
                    <span className="absolute size-5 animate-[space-ring_3.2s_ease-out_infinite_0.6s] rounded-full border border-primary/25" />
                    <span className="absolute size-2 rounded-full bg-primary/70 blur-[2px]" />
                    <Zap className="relative z-10 size-4 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.7)]" />
                  </span>

                  <span className="text-sm font-semibold text-foreground">Upgrade to Pro</span>
                </div>

                <p className="mb-3 text-xs text-muted-foreground">
                  Unlimited game generations, priority support & more
                </p>

                <Button
                  asChild
                  size="sm"
                  className="w-full shadow-[0_0_20px_hsl(var(--primary)/0.25)]"
                >
                  <Link href="/billing">Subscribe</Link>
                </Button>
              </CardContent>
            </Card>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="size-8 rounded-lg">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="rounded-lg bg-accent text-accent-foreground">
                        {user?.initials || "JD"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name || "John Doe"}</span>
                      <span className="truncate text-xs text-muted-foreground">3 credits</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem asChild>
                    <Link href="/account">
                      <User className="size-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/billing">
                      <CreditCard className="size-4" />
                      Billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-muted-foreground" onSelect={logout}>
                    <LogOut className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SidebarMenuButton
                size="lg"
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthDialog(true);
                }}
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent">
                  <LogIn className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Sign In</span>
                  <span className="truncate text-xs text-muted-foreground">or create account</span>
                </div>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
