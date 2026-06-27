"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { TabsContent } from "../ui/tabs";
import { Match } from "@/types/match-type";
import { handleMatchFetch } from "@/utils/helpers/handle-fetch";

const MatchResults = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await handleMatchFetch();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <TabsContent value="results">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading matches...</p>
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="results">
      {matches && matches.length > 0 ? (
        matches.some((match: Match) => match.matchResult) ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((match: Match) =>
              match.matchResult ? (
                <Card
                  key={match?.id}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all p-0"
                >
                  <div className="bg-muted/50 p-6 ">
                    <div className="text-xs text-muted-foreground mb-3">
                      {match?.matchResult?.competition}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={
                              match.homeTeamLogo
                                ? match.homeTeamLogo
                                : "/placeholder.svg?height=48&width=48"
                            }
                            alt="Kigali Lonestar"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium">{match.homeTeam}</span>
                      </div>
                      <span className="font-bold text-xl">
                        {match?.matchResult?.homeTeamScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={
                              match?.awayTeamLogo
                                ? match?.awayTeamLogo
                                : "/placeholder.svg?height=48&width=48"
                            }
                            alt="Rayon Sports"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium">{match?.awayTeam}</span>
                      </div>
                      <span className="font-bold text-xl">
                        {match?.matchResult?.awayTeamScore}
                      </span>
                    </div>
                  </div>
                  <CardContent className="px-6 pb-4">
                    <div className="text-sm text-muted-foreground mb-3">
                      {match?.date} •{match?.venue}
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="outline">FT</Badge>
                      <Link
                        href={`/matches/${match.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        Match Report
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : null
            )}
          </div>
        ) : (
          <div className="text-center py-4 w-full col-span-3">
            <h3 className="text-xl font-medium mb-2">No matches found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn&apos;t find any matches matching your search criteria.
            </p>
          </div>
        )
      ) : (
        <p className="text-center py-12 w-full col-span-3">No matches found</p>
      )}
    </TabsContent>
  );
};

export default MatchResults;
