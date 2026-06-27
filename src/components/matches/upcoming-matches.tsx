"use client";

import React, { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Match } from "@/types/match-type";
import { handleMatchFetch } from "@/utils/helpers/handle-fetch";
import { MatchCard } from "../match-card";

const UpcomingMatches = () => {
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
      <TabsContent value="upcoming">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading matches...</p>
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="upcoming">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {matches && matches.length > 0 ? (
          matches?.map(
            (match: Match, i: number) =>
              match.upcoming && <MatchCard key={i} {...match} />
          )
        ) : (
          <div className="text-center py-4 w-full col-span-3">
            <h3 className="text-xl font-medium mb-2">No matches found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn&apos;t find any matches matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </TabsContent>
  );
};

export default UpcomingMatches;
