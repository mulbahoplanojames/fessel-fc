"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, MoreHorizontal, Plus, Search, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import players from "@/data/players.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PlayersSkeleton from "./players-skeleton";
import { handlePlayersFetch } from "@/utils/helpers/handle-fetch";
import { Player } from "@/types/players-type";
import { deletePlayer } from "@/utils/helpers/handle-delete";

export default function PlayerClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [position, setPosition] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const { data, isFetching } = useQuery({
    queryKey: ["players"],
    queryFn: handlePlayersFetch,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
  }, [data]);

  // Filter players based on search, position, and tab
  const filteredPlayers = data?.filter((player: Player) => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !player.name.toLowerCase().includes(query) &&
        !player.position.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Filter by position
    if (position !== "all" && player.position !== position) {
      return false;
    }

    // Filter by tab
    if (activeTab === "featured" && !player.featured) return false;

    return true;
  });

  const queryClient = useQueryClient();

  const handleDeletePlayer = async (id: string) => {
    try {
      await deletePlayer(id);
      // Invalidate and refetch players
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("Player deleted successfully");
    } catch (error) {
      toast.error("Failed to delete player", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  if (isFetching) {
    return <PlayersSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players</h1>
          <p className="text-muted-foreground">
            Manage all players for Kigali Lonestar FC.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/players/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Player
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Management</CardTitle>
          <CardDescription>
            View, add, edit, and delete players.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                className="pl-10 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>

            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="Defender">Defender</SelectItem>
                <SelectItem value="Midfielder">Midfielder</SelectItem>
                <SelectItem value="Forward">Forward</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="all">All Players</TabsTrigger>
              <TabsTrigger value="featured">Featured Players</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredPlayers?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlayers?.map((player: Player) => (
                    <Card key={player.id} className="overflow-hidden p-0">
                      <div className="relative h-48">
                        <Image
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 10rem"
                          className="object-cover"
                        />
                        {player.featured && (
                          <Badge className="absolute top-2 right-2">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardContent className="px-6 pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {player.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{player.position}</Badge>
                              <span className="text-sm text-muted-foreground">
                                #{player.number}
                              </span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {/* <Link href={`/admin/players/${player.id}`} > */}
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                                {/* </Link> */}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeletePlayer(
                                    player.id?.toString() || ""
                                  )
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                          <div className="bg-muted/50 rounded-lg p-2">
                            <div className="text-sm font-medium">
                              {player.stats.appearances}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Matches
                            </div>
                          </div>
                          {player.position === "Goalkeeper" ? (
                            <>
                              {player.stats.cleanSheets !== undefined && (
                                <div className="bg-muted/50 rounded-lg p-2">
                                  <div className="text-sm font-medium">
                                    {player.stats.cleanSheets}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Clean Sheets
                                  </div>
                                </div>
                              )}
                              {player.stats.saves !== undefined && (
                                <div className="bg-muted/50 rounded-lg p-2">
                                  <div className="text-sm font-medium">
                                    {player.stats.saves}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Saves
                                  </div>
                                </div>
                              )}
                              {player.stats.passAccuracy !== undefined && (
                                <div className="bg-muted/50 rounded-lg p-2">
                                  <div className="text-sm font-medium">
                                    {player.stats.passAccuracy}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Save Accuracy
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {player.stats.goals !== undefined && (
                                <div className="bg-muted/50 rounded-lg p-2">
                                  <div className="text-sm font-medium">
                                    {player.stats.goals}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Goals
                                  </div>
                                </div>
                              )}
                              {player.stats.assists !== undefined && (
                                <div className="bg-muted/50 rounded-lg p-2">
                                  <div className="text-sm font-medium">
                                    {player.stats.assists}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Assists
                                  </div>
                                </div>
                              )}
                              {player.stats.passAccuracy !== undefined && (
                                <div className="bg-muted/50 rounded-lg p-2">
                                  <div className="text-sm font-medium">
                                    {player.stats.passAccuracy}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Pass Accuracy
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No players found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    We couldn&apos;t find any players matching your search
                    criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setPosition("all");
                      setActiveTab("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
