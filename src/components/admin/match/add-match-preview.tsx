import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DBMatch } from "@/types/match-type";
import { Plus, Trash } from "lucide-react";

interface AddMatchPreviewProps {
  match: DBMatch;
  setMatch: React.Dispatch<React.SetStateAction<DBMatch>>;
  addMatchPreview: () => void;
  handleMatchPreviewChange: (index: number, value: string) => void;
  removeMatchPreview: (index: number) => void;
}

const AddMatchPreview: React.FC<AddMatchPreviewProps> = ({
  match,
  setMatch,
  addMatchPreview,
  handleMatchPreviewChange,
  removeMatchPreview,
}) => {
  return (
    <TabsContent value="preview">
      <Card>
        <CardHeader>
          <CardTitle>Match Preview</CardTitle>
          <CardDescription>Add preview content for the match.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Preview Sections</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMatchPreview}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>

          {match.matchPreview && match.matchPreview.length > 0 ? (
            <div className="space-y-4">
              {match.matchPreview.map((preview, index) => (
                <div key={preview.id} className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`preview-${index}`}>
                      Section {index + 1}
                    </Label>
                    <Textarea
                      id={`preview-${index}`}
                      value={preview.label}
                      onChange={(e) =>
                        handleMatchPreviewChange(index, e.target.value)
                      }
                      placeholder="Enter preview content"
                      rows={3}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-8"
                    onClick={() => removeMatchPreview(index)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">
                No preview sections added yet.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={addMatchPreview}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Head to Head</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="homeTeamWins">Home Team Wins</Label>
                <Input
                  id="homeTeamWins"
                  type="number"
                  min="0"
                  value={match.backToback?.homeTeam.win || ""}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value);
                    setMatch((prev) => ({
                      ...prev,
                      backToback: {
                        ...(prev.backToback || {
                          homeTeam: { team: prev.homeTeam, win: 0 },
                          awayTeam: { team: prev.awayTeam, win: 0 },
                          bothTeams: { draw: 0 },
                        }),
                        homeTeam: {
                          team: prev.homeTeam,
                          win: isNaN(value) ? 0 : value,
                        },
                      },
                    }));
                  }}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="draws">Draws</Label>
                <Input
                  id="draws"
                  type="number"
                  min="0"
                  value={match.backToback?.bothTeams?.draw || ""}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value);
                    setMatch((prev) => ({
                      ...prev,
                      backToback: {
                        ...(prev.backToback || {
                          homeTeam: { team: prev.homeTeam, win: 0 },
                          awayTeam: { team: prev.awayTeam, win: 0 },
                          bothTeams: { draw: 0 },
                        }),
                        bothTeams: {
                          draw: isNaN(value) ? 0 : value,
                        },
                      },
                    }));
                  }}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="awayTeamWins">Away Team Wins</Label>
                <Input
                  id="awayTeamWins"
                  type="number"
                  min="0"
                  value={match.backToback?.awayTeam?.win || ""}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value);
                    setMatch((prev) => ({
                      ...prev,
                      backToback: {
                        ...(prev.backToback || {
                          homeTeam: { team: prev.homeTeam, win: 0 },
                          awayTeam: { team: prev.awayTeam, win: 0 },
                          bothTeams: { draw: 0 },
                        }),
                        awayTeam: {
                          team: prev.awayTeam,
                          win: isNaN(value) ? 0 : value,
                        },
                      },
                    }));
                  }}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddMatchPreview;
