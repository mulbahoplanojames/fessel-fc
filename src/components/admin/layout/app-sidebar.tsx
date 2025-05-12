"use client";

import * as React from "react";
import {
  BarChart3,
  LifeBuoy,
  Newspaper,
  Send,
  SettingsIcon,
  Trophy,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/admin/layout/nav-main";
import { NavSecondary } from "@/components/admin/layout/nav-secondary";
import { NavUser } from "@/components/admin/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const data = {
  user: {
    name: "oplano james",
    email: "oplaonojames@gmail.com",
    avatar: "/placeholder.svg?",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Matches",
      url: "/admin/matches",
      icon: Trophy,
    },
    {
      title: "Players",
      url: "/admin/players",
      icon: Users,
    },
    {
      title: "News",
      url: "/admin/news",
      icon: Newspaper,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg relative overflow-hidden">
                  <Image src="/badge.jpeg" alt="logo image" fill />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Kigali Lonestar</span>
                  <span className="truncate text-xs">Football Club</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
