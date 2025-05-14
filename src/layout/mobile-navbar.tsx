"use client";

import { ThemeModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    {
      href: "/gallery",
      label: "Gallery",
      active: pathname === "/gallery" || pathname.startsWith("/gallery/"),
    },
  ];
  return (
    <div className="md:hidden flex flex-1 justify-end gap-3">
      <ThemeModeToggle />
      {isMobileMenuOpen ? (
        <button onClick={() => setIsMobileMenuOpen(false)} className="mr-4">
          <X className="h-8 w-8 font-bold text-primary-clr" />
        </button>
      ) : (
        <button onClick={() => setIsMobileMenuOpen(true)} className="mr-4">
          <MenuIcon className="h-8 w-8 text-primary-clr" />
        </button>
      )}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  route.active
                    ? "text-primary bg-primary-clr"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="border-t pt-4 mt-2 flex items-center  gap-3">
              <Button
                className="flex-1 rounded-full flex bg-primary-clr text-black  hover:bg-primary-clr/80 dark:text-white"
                asChild
                variant="outline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
