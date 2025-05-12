import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { PrismaMatchType } from "@/types/match-type";

const MatchHighlights = ({ match }: { match: PrismaMatchType }) => {
  return (
    <>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Head to Head</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold mb-2">
                {match?.backToback?.homeTeam.win}
              </div>
              <div className="text-sm text-muted-foreground">
                {match?.homeTeam} Wins
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold mb-2">
                {match?.backToback?.bothTeams?.draw}
              </div>
              <div className="text-sm text-muted-foreground">Draws</div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold mb-2">
                {match?.backToback?.awayTeam?.win}
              </div>
              <div className="text-sm text-muted-foreground">
                {match?.backToback?.awayTeam?.team}Wins
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Last Meetings</h3>
          <div className="space-y-4">
            {match?.highlights?.map((highlight) => (
              <Card key={highlight.id}>
                <CardContent className="px-4">
                  <Badge>{highlight.league}</Badge>
                  <h3 className="font-semibold my-2 ">{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchHighlights;
