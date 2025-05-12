"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayersBasicInfo from "@/components/admin/players/players-basic-info";
import PlayersStats from "@/components/admin/players/players-stats";
import PlayersMediaBiograph from "@/components/admin/players/players-media-biograph";
import axios from "axios";
import { toast } from "sonner";
import { Player } from "@/types/players-type";

export default function AddPlayer() {
  const [player, setPlayer] = useState<Player>({
    name: "",
    position: "",
    number: 0,
    featured: false,
    image: "",
    stats: {
      goals: 0,
      assists: 0,
      appearances: 0,
      cleanSheets: 0,
      saves: 0,
    },
    playerbio: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playerImageFile, setPlayerImageFile] = useState<File | null>(null);
  const [playerImagePreview, setPlayerImagePreview] = useState<string>("");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number.parseInt(value);
    setPlayer((prev) => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }));
  };

  // Handle stats changes
  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number.parseInt(value);
    setPlayer((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [name]: isNaN(numValue) ? 0 : numValue,
      },
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setPlayer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setPlayer((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle player bio changes
  const handleBioChange = (index: number, value: string) => {
    const updatedBio = [...player.playerbio];
    updatedBio[index] = { ...updatedBio[index], label: value };
    setPlayer((prev) => ({ ...prev, playerbio: updatedBio }));
  };

  // Handle main image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPlayerImageFile(file);
      setPlayerImagePreview(URL.createObjectURL(file));
    }
  };

  // Add player bio
  const addBio = () => {
    const newBio = { id: Date.now(), label: "" };
    setPlayer((prev) => ({
      ...prev,
      playerbio: [...prev.playerbio, newBio],
    }));
  };

  // Remove player bio
  const removeBio = (index: number) => {
    const updatedBio = [...player.playerbio];
    updatedBio.splice(index, 1);
    setPlayer((prev) => ({ ...prev, playerbio: updatedBio }));
  };

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drop event for player image
  const handlePlayerImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setPlayerImageFile(file);
        setPlayerImagePreview(URL.createObjectURL(file));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update the player image for successful upload
    const updatedPlayer = {
      ...player,
      image: playerImageFile
        ? URL.createObjectURL(playerImageFile)
        : player.image,
    };
    console.log("Player Data", updatedPlayer);

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Add player image if it exists
      if (playerImageFile) {
        formData.append("image", playerImageFile);
      }

      // Add other player data
      formData.append("name", player.name);
      formData.append("position", player.position);
      formData.append("number", String(player.number));
      formData.append("featured", String(player.featured));

      // Add JSON fields
      formData.append("stats", JSON.stringify(player.stats));
      formData.append("playerbio", JSON.stringify(player.playerbio));

      const response = await axios.post("/api/player", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.data;

      if (response.status === 201) {
        toast.success("Player added successfully", {
          description:
            "Player has been added successfully you can view it on the players page",
        });
      }
      return data;
    } catch (error) {
      console.log("Error adding player", error);
      if (error instanceof Error) {
        toast.error("Error adding player", {
          description: error.message,
        });
      }
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/players">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add Player</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/players">Cancel</Link>
          </Button>
          <Button type="submit" form="player-form" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Player"}
          </Button>
        </div>
      </div>

      <form id="player-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="media">Media & Biography</TabsTrigger>
          </TabsList>

          {/* Player  Bacis Info  */}
          <PlayersBasicInfo
            player={player}
            handleChange={handleChange}
            handleNumberChange={handleNumberChange}
            handleSelectChange={handleSelectChange}
            handleSwitchChange={handleSwitchChange}
          />

          {/* Player stats  */}
          <PlayersStats player={player} handleStatsChange={handleStatsChange} />

          {/* Media and Biography   */}
          <PlayersMediaBiograph
            playerImagePreview={playerImagePreview}
            handleBioChange={handleBioChange}
            removeBio={removeBio}
            addBio={addBio}
            handleImageChange={handleImageChange}
            handleDragOver={handleDragOver}
            handlePlayerImageDrop={handlePlayerImageDrop}
            setPlayerImageFile={setPlayerImageFile}
            setPlayerImagePreview={setPlayerImagePreview}
            player={player}
          />
        </Tabs>
      </form>
    </div>
  );
}
