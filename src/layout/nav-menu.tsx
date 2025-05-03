"use client";

import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/matches",
      label: "Matches",
      active: pathname === "/matches" || pathname.startsWith("/matches/"),
    },
    {
      href: "/news",
      label: "News",
      icon: <Info className="mr-2 h-4 w-4" />,
      active: pathname === "/news" || pathname.startsWith("/news/"),
    },
    {
      href: "/players",
      label: "Players",
      active: pathname === "/players",
    },
    {
      href: "/tickets",
      label: "Tickets",
      active: pathname === "/tickets" || pathname.startsWith("/tickets/"),
    },
    {
      href: "/fan-zone",
      label: "Fan Zone",
      active: pathname === "/fan-zone" || pathname.startsWith("/fan-zone/"),
    },
    {
      href: "/shop",
      label: "Shop",
      active: pathname === "/shop" || pathname.startsWith("/shop/"),
    },
  ];
  return (
    <menu className="hidden md:flex items-center space-x-12 ">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center text-[14px] font-medium transition-colors hover:text-primary-clr dark:hover:text-primary-clr ",
            route.active
              ? "text-primary-clr border-b-2 border-primary-clr "
              : "text-muted-foreground dark:text-white"
          )}
        >
          {route.label}
        </Link>
      ))}
    </menu>
  );
};

export default NavMenu;
