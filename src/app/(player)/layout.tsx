"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Trophy, Calendar, User, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container px-4 py-4 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              FC Fassell
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/player/portal" className="flex items-center gap-2 text-sm hover:text-primary">
                <Home className="h-4 w-4" />
                Portal
              </Link>
              <Link href="/player/matches" className="flex items-center gap-2 text-sm hover:text-primary">
                <Trophy className="h-4 w-4" />
                Matches
              </Link>
              <Link href="/player/schedule" className="flex items-center gap-2 text-sm hover:text-primary">
                <Calendar className="h-4 w-4" />
                Schedule
              </Link>
              <Link href="/player/profile" className="flex items-center gap-2 text-sm hover:text-primary">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
