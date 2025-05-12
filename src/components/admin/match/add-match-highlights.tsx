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
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DBMatch } from "@/types/match-type";
import { Plus, Trash } from "lucide-react";

interface AddMatchHighlightsProps {
  match: DBMatch;
  addHighlight: () => void;
  removeHighlight: (index: number) => void;
  handleHighlightChange: (index: number, field: string, value: string) => void;
}

const AddMatchHighlights: React.FC<AddMatchHighlightsProps> = ({
  match,
  addHighlight,
  removeHighlight,
  handleHighlightChange,
}) => {
  return (
    <TabsContent value="highlights">
      <Card>
        <CardHeader>
          <CardTitle>Match Highlights</CardTitle>
          <CardDescription>
            Add highlight moments for this match.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Highlights</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addHighlight}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Highlight
            </Button>
          </div>

          {match.highlights && match.highlights.length > 0 ? (
            <div className="space-y-6">
              {match.highlights.map((highlight, index) => (
                <div key={highlight.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Highlight {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHighlight(index)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`highlight-title-${index}`}>Title</Label>
                      <Input
                        id={`highlight-title-${index}`}
                        value={highlight.title}
                        onChange={(e) =>
                          handleHighlightChange(index, "title", e.target.value)
                        }
                        placeholder="Enter highlight title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`highlight-description-${index}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`highlight-description-${index}`}
                        value={highlight.description || ""}
                        onChange={(e) =>
                          handleHighlightChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Enter highlight description"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`highlight-date-${index}`}>Date</Label>
                        <Input
                          id={`highlight-date-${index}`}
                          value={highlight.date || ""}
                          onChange={(e) =>
                            handleHighlightChange(index, "date", e.target.value)
                          }
                          placeholder="Enter date"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`highlight-league-${index}`}>
                          League
                        </Label>
                        <Input
                          id={`highlight-league-${index}`}
                          value={highlight.league || ""}
                          onChange={(e) =>
                            handleHighlightChange(
                              index,
                              "league",
                              e.target.value
                            )
                          }
                          placeholder="Enter league"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">No highlights added yet.</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={addHighlight}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Highlight
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddMatchHighlights;
