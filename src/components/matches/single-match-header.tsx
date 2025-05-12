import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { CalendarDays, Clock, MapPin, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { PrismaMatchType } from "@/types/match-type";
// import { Match } from "@/types/match-type";

const SingleMatchHeader = ({ match }: { match: PrismaMatchType }) => {
  return (
    <div className="bg-muted rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col items-center md:flex-row md:gap-8">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="relative h-24 w-24 mb-2">
              <Image
                src={
                  match?.homeTeamLogo
                    ? match?.homeTeamLogo
                    : "/placeholder.svg?height=96&width=96"
                }
                alt={match.homeTeam}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium text-center">{match?.homeTeam}</span>
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="text-2xl font-bold mb-1">VS</div>
            <Badge>{match.badge?.title}</Badge>
            <div className="mt-2 text-sm text-muted-foreground">
              {match.badge?.duration}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative h-24 w-24 mb-2">
              <Image
                src={
                  match.awayTeamLogo
                    ? match.awayTeamLogo
                    : "/placeholder.svg?height=96&width=96"
                }
                alt={match.awayTeam}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium text-center">{match.awayTeam}</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>{match.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{match.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{match.venue} Kigali</span>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button asChild>
              <Link href={`/tickets/buy/${match.id}`}>Buy Tickets</Link>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMatchHeader;
