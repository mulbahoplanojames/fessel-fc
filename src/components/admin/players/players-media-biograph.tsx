import Image from "next/image";
import { Plus, Trash, Camera } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/types/players-type";

interface PlayersMediaBiographProps {
  playerImagePreview: string | null;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handlePlayerImageDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  setPlayerImageFile: (file: File | null) => void;
  setPlayerImagePreview: (preview: string) => void;
  player: Player;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBioChange: (index: number, value: string) => void;
  removeBio: (index: number) => void;
  addBio: () => void;
}

const PlayersMediaBiograph: React.FC<PlayersMediaBiographProps> = ({
  playerImagePreview,
  handleDragOver,
  handlePlayerImageDrop,
  setPlayerImageFile,
  setPlayerImagePreview,
  player,
  handleImageChange,
  handleBioChange,
  removeBio,
  addBio,
}) => {
  return (
    <TabsContent value="media">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Player Images</CardTitle>
            <CardDescription>
              Upload player profile and action photos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base">Main Profile Image</Label>
              <div
                className={`relative h-64 w-full max-w-md mx-auto border-2 border-dashed rounded-lg overflow-hidden transition-colors ${
                  playerImagePreview
                    ? "border-transparent"
                    : "border-muted-foreground/25 hover:border-muted-foreground/40"
                }`}
                onDragOver={handleDragOver}
                onDrop={handlePlayerImageDrop}
              >
                {playerImagePreview ? (
                  <div className="relative h-full w-full group">
                    <Image
                      src={playerImagePreview || "/placeholder.svg"}
                      alt="Player image preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <p className="text-white text-sm">
                        Click or drag to replace
                      </p>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setPlayerImageFile(null);
                          setPlayerImagePreview("");
                        }}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                    onClick={() =>
                      document.getElementById("playerImage")?.click()
                    }
                  >
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      SVG, PNG, JPG or GIF (max. 2MB)
                    </p>
                  </div>
                )}
                <Input
                  id="playerImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Upload a player profile photo. Recommended size: 400x600px.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Player Biography</CardTitle>
            <CardDescription>
              Add biographical information about the player.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Biography Sections</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addBio}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>

            {player.playerbio.length > 0 ? (
              <div className="space-y-4">
                {player.playerbio.map((bio, index) => (
                  <div key={bio.id} className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`bio-${index}`}>
                          Section {index + 1}
                        </Label>
                        <Badge variant="outline" className="text-xs">
                          {index === 0
                            ? "Introduction"
                            : index === 1
                            ? "Career"
                            : "Personal"}
                        </Badge>
                      </div>
                      <Textarea
                        id={`bio-${index}`}
                        value={bio.label}
                        onChange={(e) => handleBioChange(index, e.target.value)}
                        placeholder="Enter biographical information"
                        rows={4}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => removeBio(index)}
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
                  No biography sections added yet.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={addBio}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default PlayersMediaBiograph;
