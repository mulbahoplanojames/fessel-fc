import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import matches from "@/data/matches.json";
import SingleMatchHeader from "@/components/matches/single-match-header";
import MatchPreview from "@/components/matches/match-preview";
import MatchHighlights from "@/components/matches/match-highlights";
// import { Match } from "@/types/match-type";
import prisma from "../../../../../../prisma";
import { PrismaMatchType } from "@/types/match-type";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = await prisma.match.findUnique({
    where: {
      id: id,
    },
  });

  // const match = matches.find((match: Match) => match.id === Number(id));

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-8">
        <Link href="/matches" className="text-primary hover:underline">
          &larr; Back to Matches
        </Link>
      </div>

      {match ? (
        <SingleMatchHeader match={match as PrismaMatchType} />
      ) : (
        <p>Match not found.</p>
      )}

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="preview">Match Preview</TabsTrigger>
          <TabsTrigger value="lineup">Lineup</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="h2h">Head to Head</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          {match ? (
            <MatchPreview match={match as PrismaMatchType} />
          ) : (
            <p>Match not found.</p>
          )}
        </TabsContent>

        <TabsContent value="lineup">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">
              Lineup Not Available Yet
            </h3>
            <p className="text-muted-foreground">
              The official lineup will be announced closer to the match. Check
              back on match day.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">
              Match Stats Not Available Yet
            </h3>
            <p className="text-muted-foreground">
              Match statistics will be available once the game starts. Check
              back during or after the match.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="h2h">
          {match ? (
            <MatchHighlights match={match as PrismaMatchType} />
          ) : (
            <p>Match not found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
