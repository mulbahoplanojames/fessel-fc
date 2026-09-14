"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Clock, Loader2 } from "lucide-react";
import axios from "axios";

interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeTeamLogo: string | null;
  awayTeamLogo: string | null;
  minute: number;
  competition: string | null;
  status: "live" | "halftime" | "fulltime" | "upcoming";
  fullTime: boolean;
}

type LiveResponse = {
  isLive: boolean;
  liveCount: number;
  matches: LiveMatch[];
};

export function LiveScoreTracker() {
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [hasLive, setHasLive] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadMatches = useCallback(async () => {
    try {
      const response = await axios.get<LiveResponse>("/api/match/live");
      setLiveMatches(response.data.matches);
      setHasLive(response.data.isLive);
    } catch (error) {
      console.error("Failed to load live matches", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();
    const interval = setInterval(loadMatches, 60000);
    return () => clearInterval(interval);
  }, [loadMatches]);

  if (loading) {
    return (
      <div className="bg-primary-clr/10 py-4">
        <div className="container px-4 mx-auto flex items-center justify-center text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Loading matches...
        </div>
      </div>
    );
  }

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
            {hasLive ? "Live Matches" : "Featured Matches"}
          </h2>
          <Link href="/matches" className="text-sm text-primary hover:underline">
            View All Matches
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveMatches.map((match) => (
            <Link key={match.id} href={`/matches/details/${match.id}`}>
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
                          : match.status === "fulltime"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }
                    >
                      {match.status === "live"
                        ? `LIVE ${match.minute}'`
                        : match.status === "halftime"
                        ? "HALF TIME"
                        : match.status === "fulltime"
                        ? "FULL TIME"
                        : match.date || "UPCOMING"}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {match.competition || match.time}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-10 w-10 bg-white rounded-full overflow-hidden">
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