"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  Edit,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
  Ticket,
} from "lucide-react";

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
// import matches from "@/data/matches.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import MatchesSkeleton from "./match-skeleton";
import { handleMatchFetch } from "@/utils/helpers/handle-fetch";
import { Match } from "@/types/match-type";
import { deleteMatch } from "@/utils/helpers/handle-delete";

export default function MatcheClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [competition, setCompetition] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const { data, isFetching } = useQuery({
    queryKey: ["matches"],
    queryFn: handleMatchFetch,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    // console.log("Data", data);
  }, [data]);

  // Filter matches based on search, competition, and tab
  const filteredMatches =
    data && Array.isArray(data) && data.length > 0
      ? data?.filter((match: Match) => {
          // Filter by search query
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (
              !match.homeTeam.toLowerCase().includes(query) &&
              !match.awayTeam.toLowerCase().includes(query) &&
              !match.venue.toLowerCase().includes(query) &&
              !match.competition?.toLowerCase().includes(query)
            ) {
              return false;
            }
          }

          // Filter by competition
          if (competition !== "all" && match.competition !== competition) {
            return false;
          }

          // Filter by tab
          if (activeTab === "upcoming" && !match.upcoming) return false;
          if (activeTab === "past" && match.upcoming) return false;
          if (activeTab === "featured" && !match.isFeatured) return false;
          if (activeTab === "live" && !match.isLive) return false;

          return true;
        })
      : [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const queryClient = useQueryClient();

  const handleDeleteMatch = async (id: string) => {
    try {
      await deleteMatch(id);
      // Invalidate and refetch players
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      toast.success("Match deleted successfully");
    } catch (error) {
      toast.error("Failed to delete match", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  if (isFetching) {
    return <MatchesSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
          <p className="text-muted-foreground">
            Manage all matches for Fassel FC.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/matches/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Match
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match Management</CardTitle>
          <CardDescription>
            View, add, edit, and delete matches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search matches..."
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

            <Select value={competition} onValueChange={setCompetition}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Competition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Competitions</SelectItem>
                <SelectItem value="Rwanda Premier League">
                  Rwanda Premier League
                </SelectItem>
                <SelectItem value="Rwanda Cup">Rwanda Cup</SelectItem>
                <SelectItem value="CECAFA Club Cup">CECAFA Club Cup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredMatches?.length > 0 ? (
                <div className="space-y-4">
                  {filteredMatches?.map((match: Match) => (
                    <div key={match.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2  flex-wrap">
                            <div className="relative w-10 h-10">
                              <Image
                                src={
                                  typeof match.homeTeamLogo === "string"
                                    ? match.homeTeamLogo
                                    : match.homeTeamLogo
                                    ? URL.createObjectURL(match.homeTeamLogo)
                                    : "/placeholder.svg"
                                }
                                alt={match.homeTeam}
                                fill
                                sizes="(max-width: 768px) 100vw, 10rem"
                                className="object-contain"
                              />
                            </div>
                            <span className="font-medium">
                              {match.homeTeam}
                            </span>
                          </div>

                          <div className="text-center">
                            {/* {match.backToback ? (
                              <div className="font-bold">
                                {match.backToback.homeTeam.win} -
                                {match.backToback.awayTeam.win}
                              </div>
                            ) : (
                              <div className="font-bold">VS</div>
                            )} */}
                            <Badge
                              variant={match.upcoming ? "outline" : "secondary"}
                              className="mt-1"
                            >
                              {match.upcoming ? "Upcoming" : "Completed"}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10">
                              <Image
                                src={
                                  typeof match.awayTeamLogo === "string"
                                    ? match.awayTeamLogo
                                    : match.awayTeamLogo
                                    ? URL.createObjectURL(match.awayTeamLogo)
                                    : "/placeholder.svg"
                                }
                                alt={match.awayTeam}
                                fill
                                sizes="(max-width: 768px) 100vw, 10rem"
                                className="object-contain"
                              />
                            </div>
                            <span className="font-medium">
                              {match.awayTeam}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center">
                              <CalendarDays className="h-4 w-4 mr-2" />
                              <span>{formatDate(match.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{match.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{match.venue}</span>
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
                                {/* <Link href={`/admin/matches/${match.id}`}> */}
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                                {/* </Link> */}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteMatch(match.id?.toString() || "")
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                              {match.upcoming && (
                                <DropdownMenuItem>
                                  {/* <Link
                                    href={`/admin/tickets/match/${match.id}`}
                                  > */}
                                  <Ticket className="h-4 w-4 mr-2" />
                                  Manage Tickets
                                  {/* </Link> */}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No matches found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    We couldn&apos;t find any matches matching your search
                    criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setCompetition("all");
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
