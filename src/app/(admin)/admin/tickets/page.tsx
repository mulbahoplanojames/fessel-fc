import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import prisma from "../../../../../prisma";

type MatchTicket = {
  name: string;
  price: number;
  available: number;
};

export default async function AdminTicketsPage() {
  const matches = await prisma.match.findMany({
    where: { ticketsAvailable: true },
    orderBy: { date: "desc" },
  });

  const upcoming = matches.filter((m) => m.upcoming);
  const past = matches.filter((m) => !m.upcoming);

  const renderMatch = (match: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    date: string;
    time: string;
    venue: string;
    tickets: unknown;
  }) => {
    const tickets = match.tickets as {
      price?: number;
      quantity?: number;
      sections?: MatchTicket[];
    } | null;

    return (
      <Card key={match.id}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-base">
              {match.homeTeam} vs {match.awayTeam}
            </CardTitle>
            <CardDescription className="mt-1 flex flex-col gap-1">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" /> {match.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {match.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {match.venue}
              </span>
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/matches/edit/${match.id}`}>Edit Match</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {tickets &&
          Array.isArray(tickets.sections) &&
          tickets.sections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tickets.sections.map((section) => (
                <div
                  key={section.name}
                  className="rounded-lg border p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{section.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {section.available} available
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      LRD {section.price.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {tickets.quantity ?? "-"} total
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No ticket sections configured for this match.
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
        <p className="text-muted-foreground mt-1">
          Tickets available for upcoming and past matches.
        </p>
      </div>

      {upcoming.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
          <div className="space-y-4">{upcoming.map(renderMatch)}</div>
        </section>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No upcoming matches with tickets available.
          </CardContent>
        </Card>
      )}

      {past.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold mb-4">Past Matches</h2>
          <div className="space-y-4">{past.map(renderMatch)}</div>
        </section>
      ) : null}
    </div>
  );
}