import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { PrismaMatchType } from "@/types/match-type";

const MatchPreview = ({ match }: { match: PrismaMatchType }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Match Preview</h2>
          <div className="prose max-w-none">
            {match.matchPreview?.map((paragraph) => (
              <p key={paragraph.id} className="pb-3">
                {paragraph.label}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Key Players to Watch</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {match.playersToWatch?.map((player) => (
              <Card key={player.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={player.avatar ? player.avatar : "/user.jpg"}
                      alt={player.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{player.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {player.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Team News</h2>
        <div className="space-y-4">
          <Card className="p-0">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">FC Fassel</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Team captain returns from injury</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>New signing available for selection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>
                    Defender suspended for accumulation of yellow cards
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MatchPreview;
