import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import matches from "@/data/matches.json";
// import { handleMatchFetch } from "@/utils/helpers/fetch-players";
import { CalendarDays } from "lucide-react";
import { MatchCard } from "../match-card";
import { DBMatch } from "@/types/match-type";
// import { Match } from "@/types/db-match-type";

const UpcommingMatches = async () => {
  // const matches = await handleMatchFetch();
  if (!matches) {
    return null;
  }
  return (
    <>
      <section className="py-20 container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Upcoming Matches
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Don&apos;t miss our next games in the Rwanda Premier League
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 rounded-full"
            asChild
          >
            <Link href="/matches">View All Matches</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {matches && Array.isArray(matches) && matches.length > 0 ? (
            matches.some((match: DBMatch) => match.upcoming) ? (
              matches?.map(
                (match: DBMatch, index: number) =>
                  match.isFeatured && (
                    <MatchCard
                      key={index}
                      {...{
                        ...match,
                        homeTeamLogo:
                          typeof match.homeTeamLogo === "string"
                            ? match.homeTeamLogo
                            : "",
                        awayTeamLogo:
                          typeof match.awayTeamLogo === "string"
                            ? match.awayTeamLogo
                            : "",
                      }}
                    />
                  )
              )
            ) : (
              <p>No Upcoming matches</p>
            )
          ) : (
            <div className="text-center py-6 ">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-medium mb-3">No Upcoming Matches</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                There are no Upcoming matches at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UpcommingMatches;

// (match: Match, index: number) =>
// match.isFeatured && (
//   <MatchCard
//     key={index}
//     {...{
//       ...match,
//       homeTeamLogo:
//         typeof match.homeTeamLogo === "string"
//           ? match.homeTeamLogo
//           : "",
//       awayTeamLogo:
//         typeof match.awayTeamLogo === "string"
//           ? match.awayTeamLogo
//           : "",
//     }}
//   />
// )
