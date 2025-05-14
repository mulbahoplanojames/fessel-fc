import MatchHero from "@/components/matches/match-hero";
import MatchResults from "@/components/matches/match-results";
import UpcomingMatches from "@/components/matches/upcoming-matches";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { CalendarDays, Filter } from "lucide-react";
import Link from "next/link";

const MatchesPage = () => {
  return (
    <>
      <MatchHero />
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">
                2024-2025 Season
              </h2>
            </div>
            <p className="text-muted-foreground">
              View all upcoming and past matches for FC Fassel
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 rounded-full flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter Matches
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-10 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <UpcomingMatches />
          </TabsContent>
          <TabsContent value="results">
            <MatchResults />
          </TabsContent>
          <TabsContent value="live">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-medium mb-3">No Live Matches</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                There are no live matches at the moment. Check the upcoming
                matches tab for the next game.
              </p>
              <Button className="rounded-full" asChild>
                <Link href="/schedule">View Schedule</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MatchesPage;
