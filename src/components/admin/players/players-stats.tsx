import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Player } from "@/types/players-type";
import React from "react";

interface PlayersStatsProps {
  player: { stats: Player["stats"] };
  handleStatsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlayersStats: React.FC<PlayersStatsProps> = ({
  player,
  handleStatsChange,
}) => {
  return (
    <TabsContent value="stats">
      <Card>
        <CardHeader>
          <CardTitle>Player Statistics</CardTitle>
          <CardDescription>
            Enter the player&apos;s performance statistics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="appearances">Appearances</Label>
              <Input
                id="appearances"
                name="appearances"
                type="number"
                min="0"
                value={player.stats.appearances || ""}
                onChange={handleStatsChange}
                placeholder="Enter number of appearances"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Goals</Label>
              <Input
                id="goals"
                name="goals"
                type="number"
                min="0"
                value={player.stats.goals || ""}
                onChange={handleStatsChange}
                placeholder="Enter number of goals"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assists">Assists</Label>
              <Input
                id="assists"
                name="assists"
                type="number"
                min="0"
                value={player.stats.assists || ""}
                onChange={handleStatsChange}
                placeholder="Enter number of assists"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cleanSheets">Clean Sheets</Label>
              <Input
                id="cleanSheets"
                name="cleanSheets"
                type="number"
                min="0"
                value={player.stats.cleanSheets || ""}
                onChange={handleStatsChange}
                placeholder="Enter number of clean sheets"
              />
              <p className="text-xs text-muted-foreground">
                For goalkeepers and defenders
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="saves">Saves</Label>
              <Input
                id="saves"
                name="saves"
                type="number"
                min="0"
                value={player.stats.saves || ""}
                onChange={handleStatsChange}
                placeholder="Enter number of saves"
              />
              <p className="text-xs text-muted-foreground">For goalkeepers</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yellowCards">Yellow Cards</Label>
              <Input
                id="yellowCards"
                name="yellowCards"
                type="number"
                value={player.stats.yellowCards || ""}
                onChange={handleStatsChange}
                placeholder="Enter number of yellow cards"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="redCards">Red Cards</Label>
              <Input
                id="redCards"
                name="redCards"
                type="number"
                value={player.stats.redCards || ""}
                onChange={handleStatsChange}
                placeholder="Enter number of red cards"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minutesPlayed">Minutes Played</Label>
              <Input
                id="minutesPlayed"
                name="minutesPlayed"
                type="number"
                value={player.stats.minutesPlayed || ""}
                onChange={handleStatsChange}
                placeholder="Enter minutes played"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passAccuracy">Pass Accuracy (%)</Label>
              <Input
                id="passAccuracy"
                name="passAccuracy"
                type="number"
                min="0"
                value={player.stats.passAccuracy || ""}
                onChange={handleStatsChange}
                max="100"
                placeholder="Enter pass accuracy percentage"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PlayersStats;
