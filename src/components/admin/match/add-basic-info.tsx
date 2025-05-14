import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { Upload } from "lucide-react";
import { DBMatch } from "@/types/match-type";

interface AddBasicInfoProps {
  match: DBMatch;
  setMatch: React.Dispatch<React.SetStateAction<DBMatch>>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSwitchChange: (field: keyof DBMatch, value: boolean) => void;
  handleSelectChange: (field: keyof DBMatch, value: string) => void;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    team: "home" | "away"
  ) => void;
  homeTeamLogoPreview?: string;
  awayTeamLogoPreview?: string;
  handleBadgeChange: (
    field: "title" | "color" | "duration",
    value: string
  ) => void;
}

const AddBasicInfo: React.FC<AddBasicInfoProps> = ({
  match,
  setMatch,
  handleChange,
  handleSwitchChange,
  handleSelectChange,
  handleFileChange,
  homeTeamLogoPreview,
  awayTeamLogoPreview,
  handleBadgeChange,
}) => {
  return (
    <TabsContent value="basic">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Enter the basic details for the match.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="homeTeam">Home Team</Label>
              <Input
                id="homeTeam"
                name="homeTeam"
                value={match.homeTeam}
                onChange={handleChange}
                placeholder="Enter home team name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="awayTeam">Away Team</Label>
              <Input
                id="awayTeam"
                name="awayTeam"
                value={match.awayTeam}
                onChange={handleChange}
                placeholder="Enter away team name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="homeTeamLogo">Home Team Logo</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-muted">
                    {homeTeamLogoPreview ? (
                      <Image
                        src={homeTeamLogoPreview || "/placeholder.svg"}
                        alt="Home team logo preview"
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                        <Upload className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="homeTeamLogo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "home")}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="awayTeamLogo">Away Team Logo</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-muted">
                    {awayTeamLogoPreview ? (
                      <Image
                        src={awayTeamLogoPreview || "/placeholder.svg"}
                        alt="Away team logo preview"
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                        <Upload className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="awayTeamLogo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "away")}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={match.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={match.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                name="venue"
                value={match.venue}
                onChange={handleChange}
                placeholder="Enter venue name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competition">Competition</Label>
              <Select
                value={match.competition}
                onValueChange={(value) =>
                  handleSelectChange("competition", value)
                }
              >
                <SelectTrigger id="competition">
                  <SelectValue placeholder="Select competition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Rwanda Premier League">
                    LFA-Orange National League
                  </SelectItem>
                  <SelectItem value="Rwanda Cup">
                    Liberia First Division Cup
                  </SelectItem>
                  <SelectItem value="CECAFA Club Cup">
                    CECAFA Club Cup
                  </SelectItem>
                  <SelectItem value="CAF Champions League">
                    CAF Champions League
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ticketsAvailable">Tickets Available</Label>
                <p className="text-sm text-muted-foreground">
                  Enable if tickets are available for this match
                </p>
              </div>
              <Switch
                id="ticketsAvailable"
                checked={match.ticketsAvailable}
                onCheckedChange={(checked) =>
                  handleSwitchChange("ticketsAvailable", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="upcoming">Upcoming Match</Label>
                <p className="text-sm text-muted-foreground">
                  Is this an upcoming match or a past match?
                </p>
              </div>
              <Switch
                id="upcoming"
                checked={match.upcoming}
                onCheckedChange={(checked) =>
                  handleSwitchChange("upcoming", checked)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isFeatured">Featured Match</Label>
                <p className="text-sm text-muted-foreground">
                  Feature this match on the homepage
                </p>
              </div>
              <Switch
                id="isFeatured"
                checked={match.isFeatured}
                onCheckedChange={(checked) =>
                  handleSwitchChange("isFeatured", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isLive">Live Match</Label>
                <p className="text-sm text-muted-foreground">
                  Is this match currently live?
                </p>
              </div>
              <Switch
                id="isLive"
                checked={match.isLive}
                onCheckedChange={(checked) =>
                  handleSwitchChange("isLive", checked)
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Match Badge</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="badgeTitle">Badge Title</Label>
                <Input
                  id="badgeTitle"
                  value={match.badge?.title || ""}
                  onChange={(e) => handleBadgeChange("title", e.target.value)}
                  placeholder="e.g., LIVE"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badgeColor">Badge Color</Label>
                <Select
                  value={match.badge?.color || "red"}
                  onValueChange={(value) => handleBadgeChange("color", value)}
                >
                  <SelectTrigger id="badgeColor">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="yellow">Yellow</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="badgeDuration">Badge Duration</Label>
                <Input
                  id="badgeDuration"
                  value={match.badge?.duration || ""}
                  onChange={(e) =>
                    handleBadgeChange("duration", e.target.value)
                  }
                  placeholder="e.g., 90 mins"
                />
              </div>
            </div>
          </div>

          {!match.upcoming && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Match Result</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="homeTeamScore">Home Team Score</Label>
                    <Input
                      id="homeTeamScore"
                      name="homeTeamScore"
                      type="number"
                      min="0"
                      value={match.matchResult?.homeTeamScore || ""}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value);
                        setMatch((prev) => ({
                          ...prev,
                          matchResult: {
                            ...(prev.matchResult || {
                              status: "FT",
                              competition: prev.competition || "",
                            }),
                            homeTeamScore: isNaN(value) ? 0 : value,
                            awayTeamScore: prev.matchResult?.awayTeamScore || 0,
                          },
                        }));
                      }}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="awayTeamScore">Away Team Score</Label>
                    <Input
                      id="awayTeamScore"
                      name="awayTeamScore"
                      type="number"
                      min="0"
                      value={match.matchResult?.awayTeamScore || ""}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value);
                        setMatch((prev) => ({
                          ...prev,
                          matchResult: {
                            ...(prev.matchResult || {
                              status: "FT",
                              competition: prev.competition || "",
                            }),
                            awayTeamScore: isNaN(value) ? 0 : value,
                            homeTeamScore: prev.matchResult?.homeTeamScore || 0,
                          },
                        }));
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchStatus">Match Status</Label>
                  <Select
                    value={match.matchResult?.status || "FT"}
                    onValueChange={(value) => {
                      setMatch((prev) => ({
                        ...prev,
                        matchResult: {
                          ...(prev.matchResult || {
                            homeTeamScore: 0,
                            awayTeamScore: 0,
                            competition: prev.competition || "",
                          }),
                          status: value,
                        },
                      }));
                    }}
                  >
                    <SelectTrigger id="matchStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FT">Full Time (FT)</SelectItem>
                      <SelectItem value="HT">Half Time (HT)</SelectItem>
                      <SelectItem value="AET">
                        After Extra Time (AET)
                      </SelectItem>
                      <SelectItem value="PEN">Penalties (PEN)</SelectItem>
                      <SelectItem value="CANC">Cancelled (CANC)</SelectItem>
                      <SelectItem value="POSTP">Postponed (POSTP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddBasicInfo;
