import React from "react";
import { Button } from "../ui/button";
import { PrismaPlayerType } from "@/types/players-type";
import { PlayerCard } from "../player-card";

interface ForwardsPlayersProps {
  filteredPlayers: PrismaPlayerType[];
  clearSearch: () => void;
}

const ForwardsPlayers: React.FC<ForwardsPlayersProps> = ({
  filteredPlayers,
  clearSearch,
}) => {
  return (
    <>
      {filteredPlayers &&
      Array.isArray(filteredPlayers) &&
      filteredPlayers?.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              id={player.id}
              name={player.name}
              position={player.position}
              number={player.number}
              image={player.image}
              stats={player.stats}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No forwards found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn&apos;t find any forwards matching your search criteria.
          </p>
          <Button variant="outline" onClick={clearSearch}>
            Clear Search
          </Button>
        </div>
      )}
    </>
  );
};

export default ForwardsPlayers;
