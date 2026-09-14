import { requireAdmin } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import prisma from "../../../../../../../../../prisma";

export default async function LeagueStandingsPage() {
  await requireAdmin();
  
  const standings = await prisma.leagueStanding.findMany({
    orderBy: { position: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">League Standings</h1>
          <p className="text-muted-foreground mt-1">
            Manage league table and team positions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/league/standings/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Team
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {standings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No standings data found. Add your first team to get started.
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="text-left py-3 px-4">#</th>
                      <th className="text-left py-3 px-4">Team</th>
                      <th className="text-center py-3 px-4">P</th>
                      <th className="text-center py-3 px-4">W</th>
                      <th className="text-center py-3 px-4">D</th>
                      <th className="text-center py-3 px-4">L</th>
                      <th className="text-center py-3 px-4">GF</th>
                      <th className="text-center py-3 px-4">GA</th>
                      <th className="text-center py-3 px-4">GD</th>
                      <th className="text-center py-3 px-4">Pts</th>
                      <th className="text-center py-3 px-4">Season</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team) => (
                      <tr key={team.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{team.position}</td>
                        <td className="py-3 px-4">{team.teamName}</td>
                        <td className="text-center py-3 px-4">{team.played}</td>
                        <td className="text-center py-3 px-4">{team.won}</td>
                        <td className="text-center py-3 px-4">{team.drawn}</td>
                        <td className="text-center py-3 px-4">{team.lost}</td>
                        <td className="text-center py-3 px-4">{team.goalsFor}</td>
                        <td className="text-center py-3 px-4">{team.goalsAgainst}</td>
                        <td className="text-center py-3 px-4">{team.goalDiff}</td>
                        <td className="text-center py-3 px-4 font-bold">{team.points}</td>
                        <td className="text-center py-3 px-4">
                          <Badge variant="outline">{team.season}</Badge>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex gap-2 justify-center">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/league/standings/edit/${team.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive" asChild>
                              <Link href={`/admin/league/standings/delete/${team.id}`}>
                                <Trash2 className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
