import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
// import players from "@/data/players.json";
import { PrismaPlayerType } from "@/types/players-type";
import { handlePlayersFetch } from "@/utils/helpers/handle-fetch";
import { PlayerCard } from "../player-card";

const FeaturedPlayers = async () => {
  const players = await handlePlayersFetch();

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
