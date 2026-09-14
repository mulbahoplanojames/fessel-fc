import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import axios from "axios";

interface LeagueStanding {
  id: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: string[] | null;
  position: number;
  season: string;
}

export default function LeagueStandings() {
  const [standings, setStandings] = React.useState<LeagueStanding[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get("/api/league/standings");
        setStandings(response.data);
      } catch (error) {
        console.error("Error fetching standings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>League Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading standings...</div>
        </CardContent>
      </Card>
    );
  }

  if (standings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>League Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No standings data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>League Table - {standings[0]?.season}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">#</th>
                <th className="text-left py-2 px-2">Team</th>
                <th className="text-center py-2 px-2">P</th>
                <th className="text-center py-2 px-2">W</th>
                <th className="text-center py-2 px-2">D</th>
                <th className="text-center py-2 px-2">L</th>
                <th className="text-center py-2 px-2">GF</th>
                <th className="text-center py-2 px-2">GA</th>
                <th className="text-center py-2 px-2">GD</th>
                <th className="text-center py-2 px-2">Pts</th>
                <th className="text-center py-2 px-2">Form</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={team.id} className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 font-medium">{team.position}</td>
                  <td className="py-2 px-2">{team.teamName}</td>
                  <td className="text-center py-2 px-2">{team.played}</td>
                  <td className="text-center py-2 px-2">{team.won}</td>
                  <td className="text-center py-2 px-2">{team.drawn}</td>
                  <td className="text-center py-2 px-2">{team.lost}</td>
                  <td className="text-center py-2 px-2">{team.goalsFor}</td>
                  <td className="text-center py-2 px-2">{team.goalsAgainst}</td>
                  <td className="text-center py-2 px-2">{team.goalDiff}</td>
                  <td className="text-center py-2 px-2 font-bold">{team.points}</td>
                  <td className="text-center py-2 px-2">
                    <div className="flex gap-1 justify-center">
                      {team.form && team.form.map((result, idx) => (
                        <Badge
                          key={`${result}-${idx}`}
                          variant={
                            result === "W"
                              ? "default"
                              : result === "D"
                              ? "secondary"
                              : "destructive"
                          }
                          className="w-6 h-6 flex items-center justify-center text-xs"
                        >
                          {result}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
