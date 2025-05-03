import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlayerStats {
  goals?: number;
  assists?: number;
  appearances: number;
  cleanSheets?: number;
  saves?: number;
}

interface PlayerCardProps {
  id: string;
  name: string;
  position: string;
  number: number;
  image: string;
  stats: PlayerStats;
}

export function PlayerCard({
  id,
  name,
  position,
  number,
  image,
  stats,
}: PlayerCardProps) {
  return (
    <Card className="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-all dark:bg-background p-0">
      <div className="relative h-64 overflow-hidden">
        <Badge className="absolute top-3 right-3 z-10">{number}</Badge>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6 w-full">
            <Button
              variant="secondary"
              size="sm"
              className="w-full rounded-full"
              asChild
            >
              <Link href={`/players/${id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="px-4 pb-4">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{position}</p>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="text-sm font-medium">{stats.appearances}</div>
            <div className="text-xs text-muted-foreground">Matches</div>
          </div>

          {stats.goals != 0 && (
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-sm font-medium">{stats.goals}</div>
              <div className="text-xs text-muted-foreground">Goals</div>
            </div>
          )}

          {stats.assists != 0 && (
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-sm font-medium">{stats.assists}</div>
              <div className="text-xs text-muted-foreground">Assists</div>
            </div>
          )}

          {stats.cleanSheets != 0 && (
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-sm font-medium">{stats.cleanSheets}</div>
              <div className="text-xs text-muted-foreground">Clean Sheets</div>
            </div>
          )}

          {stats.saves != 0 && (
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-sm font-medium">{stats.saves}</div>
              <div className="text-xs text-muted-foreground">Saves</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
