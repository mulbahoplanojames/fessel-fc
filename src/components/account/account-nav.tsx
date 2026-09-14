"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, Handshake, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/account/profile", label: "Edit Profile", icon: CircleUser },
  { href: "/account/settings", label: "Account Settings", icon: Settings },
  { href: "/account/support", label: "Support", icon: Handshake },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 rounded-xl border bg-card p-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-100",
              active &&
                "bg-primary-clr text-white hover:bg-primary-clr/90 hover:text-white dark:text-white dark:hover:bg-primary-clr/90 dark:hover:text-white"
            )}
          >
            <Icon className="size-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}