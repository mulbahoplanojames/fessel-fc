"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayersHero from "@/components/players/players-hero";
import PlayersHeader from "@/components/players/players-header";
import AllPlayers from "@/components/players/all-players";
import ForwardsPlayers from "@/components/players/forwards-players";
import Midfielders from "@/components/players/midfielders";
import Defenders from "@/components/players/defenders";
import Goalkeepers from "@/components/players/goalkeepers";
import Staffs from "@/components/players/staffs";
import { PrismaPlayerType } from "@/types/players-type";
import { useQuery } from "@tanstack/react-query";
import { handlePlayersFetch } from "@/utils/helpers/handle-fetch";
// import players from "@/data/players.json";

export default function PlayersPage() {
  const { data: players } = useQuery({
    queryKey: ["players"],
    queryFn: handlePlayersFetch,
  });

  useEffect(() => {
    if (!players) {
      return;
    }
  }, [players]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPlayers, setFilteredPlayers] =
    useState<PrismaPlayerType[]>(players);

  // Filter players based on active tab and search query
  useEffect(() => {
    let result =
      (players &&
        Array.isArray(players) &&
        players.map((item: PrismaPlayerType) => item)) ||
      [];

    // Filter by position if not "all"
    if (activeTab !== "all") {
      const positionMap: Record<string, string> = {
        forwards: "Forward",
        midfielders: "Midfielder",
        defenders: "Defender",
        goalkeepers: "Goalkeeper",
      };

      result = result.filter(
        (player: PrismaPlayerType) => player.position === positionMap[activeTab]
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((player: PrismaPlayerType) =>
        player.name.toLowerCase().includes(query)
      );
    }

    // Sort by shirt number
    result.sort(
      (a: PrismaPlayerType, b: PrismaPlayerType) => a.number - b.number
    );

    setFilteredPlayers(result);
  }, [activeTab, searchQuery, players]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <PlayersHero />
      <div className="container px-2 py-8 mx-auto ">
        <div className="bg-pattern py-4 px-2">
          <PlayersHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch}
          />

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="mb-10 w-full max-w-xl mx-auto grid grid-cols-5">
              <TabsTrigger value="all">All Players</TabsTrigger>
              <TabsTrigger value="forwards">Forwards</TabsTrigger>
              <TabsTrigger value="midfielders">Midfielders</TabsTrigger>
              <TabsTrigger value="defenders">Defenders</TabsTrigger>
              <TabsTrigger value="goalkeepers">Goalkeepers</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <AllPlayers
                filteredPlayers={filteredPlayers}
                clearSearch={clearSearch}
              />
            </TabsContent>

            <TabsContent value="forwards">
              <ForwardsPlayers
                filteredPlayers={filteredPlayers}
                clearSearch={clearSearch}
              />
            </TabsContent>

            <TabsContent value="midfielders">
              <Midfielders
                filteredPlayers={filteredPlayers}
                clearSearch={clearSearch}
              />
            </TabsContent>

            <TabsContent value="defenders">
              <Defenders
                filteredPlayers={filteredPlayers}
                clearSearch={clearSearch}
              />
            </TabsContent>

            <TabsContent value="goalkeepers">
              <Goalkeepers
                filteredPlayers={filteredPlayers}
                clearSearch={clearSearch}
              />
            </TabsContent>
          </Tabs>
        </div>
        <Staffs />
      </div>
    </div>
  );
}
