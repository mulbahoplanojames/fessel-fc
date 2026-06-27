"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { PrismaPlayerType } from "@/types/players-type";
import { handlePlayersFetch } from "@/utils/helpers/handle-fetch";
import { PlayerCard } from "../player-card";

const FeaturedPlayers = () => {
  const [players, setPlayers] = useState<PrismaPlayerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await handlePlayersFetch();
        setPlayers(data || []);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 container px-4 mx-auto">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading players...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 container px-4 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Featured Players
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Meet the stars of Kigali Lonestar FC
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0 rounded-full" asChild>
          <Link href="/players">View All Players</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {players.map(
          (player: PrismaPlayerType) =>
            player.featured && <PlayerCard key={player.id} {...player} />
        )}
      </div>
    </section>
  );
};

export default FeaturedPlayers;
