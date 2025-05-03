import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Match } from "@/types/match-type";

export function MatchCard({
  id,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  date,
  time,
  venue,
  competition,
  ticketsAvailable,
}: Match) {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all dark:bg-background p-0">
      <div className="bg-muted/50 md:p-6 p-4">
        <Badge variant="outline" className="mb-3">
          {competition}
        </Badge>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="relative md:h-20 md:w-20 w-12 h-12 mb-3">
              <Image
                src={homeTeamLogo || "/placeholder.svg"}
                alt={homeTeam}
                fill
                className="object-contain"
              />
            </div>
            <span className="md:text-sm text-xs font-medium text-center">
              {homeTeam}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="md:text-2xl text-base font-bold mb-2">VS</span>
            <Link
              href={`/matches/details/${id}`}
              className="text-xs text-primary-clr hover:underline"
            >
              Match Details
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative md:h-20 md:w-20 w-12 h-12 mb-3">
              <Image
                src={awayTeamLogo || "/placeholder.svg"}
                alt={awayTeam}
                fill
                className="object-contain"
              />
            </div>
            <span className="md:text-sm text-xs font-medium text-center">
              {awayTeam}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="px-6 py-3">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <CalendarDays className="h-4 w-4 mr-2 text-primary" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>{time}</span>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{venue}</span>
          </div>
        </div>

        {ticketsAvailable ? (
          <Button
            className="w-full mt-6 rounded-full bg-primary-clr hover:bg-primary-clr/80 dark:text-white"
            asChild
          >
            <Link href={`/tickets/buy/${id}`}>Buy Tickets</Link>
          </Button>
        ) : (
          <Button
            className="w-full mt-6 rounded-full"
            variant="outline"
            disabled
          >
            Tickets Soon
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
