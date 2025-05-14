"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, MapPin, Search, Ticket, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import TicketsHero from "@/components/tickets/tickets-hero";
import SeasonTickets from "../../../components/tickets/season-tickets";
import Packages from "../../../components/tickets/packages";
// import matches from "@/data/matches.json";
import { useQuery } from "@tanstack/react-query";
import { PrismaMatchType } from "@/types/match-type";
import { handleMatchFetch } from "@/utils/helpers/handle-fetch";

export default function TicketsPage() {
  const { data: matches } = useQuery({
    queryKey: ["matches"],
    queryFn: handleMatchFetch,
  });

  useEffect(() => {
    if (!matches) {
      return;
    }
  }, [matches]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMatches, setFilteredMatches] = useState(matches);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      const filtered = matches.filter(
        (match: PrismaMatchType) =>
          match.homeTeam.toLowerCase().includes(lowercaseQuery) ||
          match.awayTeam.toLowerCase().includes(lowercaseQuery) ||
          match.competition?.toLowerCase().includes(lowercaseQuery) ||
          match.venue.toLowerCase().includes(lowercaseQuery) ||
          match.date.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredMatches(filtered);
    } else {
      setFilteredMatches(matches);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredMatches(matches);
  };

  return (
    <div>
      <TicketsHero />
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Available Tickets
            </h2>
            <p className="text-muted-foreground">
              Secure your seat for the next FC Fassel match
            </p>
          </div>
          <div className="relative mt-4 md:mt-0 w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search matches..."
              className="pl-10 pr-10 rounded-full w-full md:w-[300px]"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="mb-10 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="matches">Match Tickets</TabsTrigger>
            <TabsTrigger value="season">Season Tickets</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          <TabsContent value="matches">
            {filteredMatches &&
            Array.isArray(filteredMatches) &&
            filteredMatches?.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredMatches.map(
                  (match: PrismaMatchType) =>
                    match.tickets && (
                      <Card
                        key={match.id}
                        className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all dark:bg-background p-0"
                      >
                        <div className="relative h-56 grid grid-cols-2 gap-2">
                          <Image
                            src={match.homeTeamLogo || "/placeholder.svg"}
                            alt={match.homeTeam}
                            fill
                            className="object-cover col-start-1"
                          />
                          <Image
                            src={match.awayTeamLogo || "/placeholder.svg"}
                            alt={match.awayTeam}
                            fill
                            className="object-cover col-start-2"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="font-semibold text-xl">
                              {match.homeTeam} vs {match.awayTeam}
                            </h3>
                            <p className="text-sm text-white/80">
                              {match.competition}
                            </p>
                          </div>
                        </div>
                        <CardContent className="px-6">
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                              <span>{match.date}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              <span>{match.time}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-2 text-primary" />
                              <span>{match.venue}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Ticket className="h-4 w-4 mr-2 text-primary" />
                              <span>
                                Tickets from {match.tickets?.price} LRD
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                          <Button
                            className="w-full rounded-full bg-primary-clr hover:bg-primary-clr/90"
                            asChild
                          >
                            <Link href={`/tickets/buy/${match.id}`}>
                              Buy Tickets
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">
                  No matches Ticket found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We couldn&apos;t find any matches matching your search
                  criteria.
                </p>
                <Button variant="outline" onClick={clearSearch}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="season">
            <SeasonTickets />
          </TabsContent>
          <TabsContent value="packages">
            <Packages />
          </TabsContent>
        </Tabs>

        <div className="mt-20 bg-muted/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              Ticket Information
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about purchasing tickets for FC Fassel
              matches
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">How to Purchase</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Online through our official website</li>
                <li>At the stadium ticket office (open Mon-Fri, 9am-5pm)</li>
                <li>Through our mobile app</li>
                <li>At authorized ticket vendors across Monrovia</li>
              </ul>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">
                Match Day Information
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Gates open 2 hours before kick-off</li>
                <li>Please arrive early to avoid congestion</li>
                <li>Have your ticket ready for scanning</li>
                <li>Follow steward instructions at all times</li>
              </ul>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Refund Policy</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Full refund if match is cancelled</li>
                <li>No refunds for rescheduled matches</li>
                <li>Tickets can be transferred to another person</li>
                <li>Contact customer service for special circumstances</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
