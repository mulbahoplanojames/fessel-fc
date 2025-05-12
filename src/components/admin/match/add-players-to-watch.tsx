import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TabsContent } from "@/components/ui/tabs";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { DBMatch } from "@/types/match-type";

interface AddPlayersToWatchOutForProps {
  match: DBMatch;
  handlePlayerChange: (index: number, field: string, value: string) => void;
  removePlayer: (index: number) => void;
  addPlayer: () => void;
}

const AddPlayersToWatchOutFor: React.FC<AddPlayersToWatchOutForProps> = ({
  match,
  handlePlayerChange,
  removePlayer,
  addPlayer,
}) => {
  return (
    <TabsContent value="players">
      <Card>
        <CardHeader>
          <CardTitle>Players to Watch</CardTitle>
          <CardDescription>
            Add key players to highlight for this match.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Key Players</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPlayer}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Player
            </Button>
          </div>

          {match.playersToWatch && match.playersToWatch.length > 0 ? (
            <div className="space-y-6">
              {match.playersToWatch.map((player, index) => (
                <div key={player.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Player {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePlayer(index)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`player-name-${index}`}>Name</Label>
                      <Input
                        id={`player-name-${index}`}
                        value={player.name}
                        onChange={(e) =>
                          handlePlayerChange(index, "name", e.target.value)
                        }
                        placeholder="Enter player name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`player-position-${index}`}>
                        Position
                      </Label>
                      <Input
                        id={`player-position-${index}`}
                        value={player.position || ""}
                        onChange={(e) =>
                          handlePlayerChange(index, "position", e.target.value)
                        }
                        placeholder="Enter player position"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`player-team-${index}`}>Team</Label>
                      <Select
                        value={player.team || ""}
                        onValueChange={(value) =>
                          handlePlayerChange(index, "team", value)
                        }
                      >
                        <SelectTrigger id={`player-team-${index}`}>
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={match.homeTeam || "home"}>
                            {match.homeTeam || "Home Team"}
                          </SelectItem>
                          <SelectItem value={match.awayTeam || "away"}>
                            {match.awayTeam || "Away Team"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`player-avatar-${index}`}>
                        Player Image
                      </Label>
                      <Input
                        id={`player-avatar-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const imageUrl = URL.createObjectURL(file);
                            handlePlayerChange(index, "avatar", imageUrl);
                          }
                        }}
                        className="cursor-pointer"
                      />
                      {player.avatar && (
                        <div className="mt-2 relative w-16 h-16 border rounded-md overflow-hidden">
                          <Image
                            src={player.avatar || "/placeholder.svg"}
                            alt={`${player.name} avatar`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">No players added yet.</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={addPlayer}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Player
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddPlayersToWatchOutFor;
