"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeTeamLogo: string;
  awayTeamLogo: string;
  minute: number;
  competition: string;
  status: "live" | "halftime" | "fulltime";
}

// Mock live match data
const mockLiveMatches: LiveMatch[] = [
  {
    id: "1",
    homeTeam: "FC Fassell",
    awayTeam: "LISCR FC",
    homeScore: 2,
    awayScore: 1,
    homeTeamLogo: "/placeholder.svg?height=64&width=64",
    awayTeamLogo: "/placeholder.svg?height=64&width=64",
    minute: 20,
    competition: "Rwanda Premier League",
    status: "live",
  },
];

export function LiveScoreTracker() {
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>(mockLiveMatches);
  // const [isLive, setIsLive] = useState(true);

  const isLive = true;

  // Simulate updating the match time
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLiveMatches((prev) =>
        prev.map((match) => {
          if (match.status === "live" && match.minute < 90) {
            return { ...match, minute: match.minute + 1 };
          } else if (match.status === "live" && match.minute >= 90) {
            return { ...match, status: "fulltime" };
          }
          return match;
        })
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isLive]);

  if (liveMatches.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary-clr/10 py-4">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live Matches
          </h2>
          <Link
            href="/matches/live"
            className="text-sm text-primary hover:underline"
          >
            View All Live Matches
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveMatches.map((match) => (
            <Link key={match.id} href={`/matches/${match.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer p-0">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Badge
                      variant="outline"
                      className={
                        match.status === "live"
                          ? "bg-red-500 text-white"
                          : match.status === "halftime"
                          ? "bg-amber-500 text-white"
                          : "bg-green-500 text-white"
                      }
                    >
                      {match.status === "live"
                        ? `LIVE ${match.minute}'`
                        : match.status === "halftime"
                        ? "HALF TIME"
                        : "FULL TIME"}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {match.competition}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-10 w-10 bg-white rounded-full  overflow-hidden">
                        <Image
                          src={match.homeTeamLogo || "/placeholder.svg"}
                          alt={match.homeTeam}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="font-medium">{match.homeTeam}</span>
                    </div>
                    <span className="font-bold text-xl">{match.homeScore}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-10 w-10 bg-white rounded-full overflow-hidden">
                        <Image
                          src={match.awayTeamLogo || "/placeholder.svg"}
                          alt={match.awayTeam}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="font-medium">{match.awayTeam}</span>
                    </div>
                    <span className="font-bold text-xl">{match.awayScore}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
