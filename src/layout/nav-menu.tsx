"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  const pathname = usePathname();

  const routes = [
    {
      path: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      path: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      path: "/matches",
      label: "Matches",
      active: pathname === "/matches" || pathname.startsWith("/matches/"),
    },
    {
      path: "/news",
      label: "News",
      icon: <Info className="mr-2 h-4 w-4" />,
      active: pathname === "/news" || pathname.startsWith("/news/"),
    },
    {
      path: "/players",
      label: "Players",
      active: pathname === "/players",
    },
    {
      path: "/tickets",
      label: "Tickets",
      active: pathname === "/tickets" || pathname.startsWith("/tickets/"),
    },
    {
      path: "/shop",
      label: "Shop",
      active: pathname === "/shop" || pathname.startsWith("/shop/"),
    },
  ];

  const extraNavItems = [
    {
      label: "About Us",
      path: "/about",
      active: pathname === "/fan-zone" || pathname.startsWith("/fan-zone/"),
    },
    {
      path: "/fan-zone",
      label: "Fan Zone",
      active: pathname === "/fan-zone" || pathname.startsWith("/fan-zone/"),
    },
  ];

  return (
    <menu className="hidden md:flex items-center space-x-12 ">
      {routes.map((route) =>
        route.label === "About" ? (
          <DropdownMenu key={route.label}>
            <DropdownMenuTrigger className=" text-[14px] font-medium transition-colors hover:text-primary-clr dark:hover:text-primary-clr transition-colors  relative group ">
              About
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999]">
              {extraNavItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link
                    href={item.path}
                    className={cn(
                      "text-[14px] font-medium transition-colors hover:text-primary-clr dark:hover:text-primary-clr ",
                      route.active
                        ? "text-primary-clr border-b-2 border-primary-clr "
                        : "text-muted-foreground dark:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "flex items-center text-[14px] font-medium transition-colors hover:text-primary-clr dark:hover:text-primary-clr ",
              route.active
                ? "text-primary-clr border-b-2 border-primary-clr "
                : "text-muted-foreground dark:text-white"
            )}
          >
            {route.label}
          </Link>
        )
      )}
    </menu>
  );
};

export default NavMenu;
