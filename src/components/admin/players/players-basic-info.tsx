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
import { TabsContent } from "@/components/ui/tabs";
import { Player } from "@/types/players-type";

interface PlayersBasicInfoProps {
  player: Player;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  handleSwitchChange: (field: string, value: boolean) => void;
}

const PlayersBasicInfo: React.FC<PlayersBasicInfoProps> = ({
  player,
  handleChange,
  handleNumberChange,
  handleSelectChange,
  handleSwitchChange,
}) => {
  return (
    <TabsContent value="basic">
      <Card>
        <CardHeader>
          <CardTitle>Player Details</CardTitle>
          <CardDescription>
            Enter the player&apos;s basic information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={player.name}
                onChange={handleChange}
                placeholder="Enter player's full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Jersey Number</Label>
              <Input
                id="number"
                name="number"
                type="number"
                min="1"
                max="99"
                value={player.number || ""}
                onChange={handleNumberChange}
                placeholder="Enter jersey number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select
                value={player.position}
                onValueChange={(value) => handleSelectChange("position", value)}
              >
                <SelectTrigger id="position" className="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                  <SelectItem value="Defender">Defender</SelectItem>
                  <SelectItem value="Midfielder">Midfielder</SelectItem>
                  <SelectItem value="Forward">Forward</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select>
                <SelectTrigger id="nationality" className="w-full">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="liberia">Liberia</SelectItem>
                  <SelectItem value="moroco">Moroco</SelectItem>
                  <SelectItem value="gambia">Gambia</SelectItem>
                  <SelectItem value="uganda">Uganda</SelectItem>
                  <SelectItem value="kenya">Kenya</SelectItem>
                  <SelectItem value="tanzania">Tanzania</SelectItem>
                  <SelectItem value="burundi">Burundi</SelectItem>
                  <SelectItem value="drc">DR Congo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                placeholder="Select date of birth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min="150"
                max="220"
                placeholder="Enter height in cm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured Player</Label>
              <p className="text-sm text-muted-foreground">
                Feature this player on the homepage
              </p>
            </div>
            <Switch
              id="featured"
              checked={player.featured}
              onCheckedChange={(checked) =>
                handleSwitchChange("featured", checked)
              }
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PlayersBasicInfo;
