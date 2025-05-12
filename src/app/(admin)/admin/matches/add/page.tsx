"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddBasicInfo from "@/components/admin/match/add-basic-info";
import AddMatchPreview from "@/components/admin/match/add-match-preview";
import AddPlayersToWatchOutFor from "@/components/admin/match/add-players-to-watch";
import AddMatchHighlights from "@/components/admin/match/add-match-highlights";
import AddMatchTickets from "@/components/admin/match/add-match-tickets";
import axios from "axios";
import { toast } from "sonner";
import { DBMatch } from "@/types/match-type";
export default function AddMatch() {
  const [match, setMatch] = useState<DBMatch>({
    homeTeam: "",
    awayTeam: "",
    homeTeamLogo: "",
    awayTeamLogo: "",
    date: "",
    time: "",
    venue: "",
    competition: "",
    ticketsAvailable: true,
    upcoming: true,
    isFeatured: false,
    isLive: false,
    matchPreview: [],
    playersToWatch: [],
    highlights: [],
    tickets: {
      price: 5000,
      quantity: 1000,
      sections: [
        { name: "General", price: 5000, available: 500 },
        { name: "Premium", price: 10000, available: 300 },
        { name: "VIP", price: 20000, available: 200 },
      ],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [homeTeamLogoFile, setHomeTeamLogoFile] = useState<File | null>(null);
  const [awayTeamLogoFile, setAwayTeamLogoFile] = useState<File | null>(null);
  const [homeTeamLogoPreview, setHomeTeamLogoPreview] = useState<string>("");
  const [awayTeamLogoPreview, setAwayTeamLogoPreview] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    // Add file fields - Fix file handling
    if (homeTeamLogoFile) {
      formData.append("homeTeamLogo", homeTeamLogoFile);
    }
    if (awayTeamLogoFile) {
      formData.append("awayTeamLogo", awayTeamLogoFile);
    }

    // Add player avatars
    match.playersToWatch?.forEach((player) => {
      if (player.avatar && typeof player.avatar !== "string") {
        formData.append("playerAvatars", player.avatar);
      }
    });

    //   // Add home match logo for successful upload
    // const updatedMatch = {
    //   ...match,
    //   homeTeamLogo: homeTeamLogoFile
    //     ? URL.createObjectURL(homeTeamLogoFile)
    //     : match.homeTeamLogo,
    //   awayTeamLogo: awayTeamLogoFile
    //     ? URL.createObjectURL(awayTeamLogoFile)
    //     : match.awayTeamLogo,
    // };

    // console.log("Updated Match", updatedMatch);

    // Add other fields
    formData.append("homeTeam", match.homeTeam);
    formData.append("awayTeam", match.awayTeam);
    formData.append("date", match.date);
    formData.append("time", match.time);
    formData.append("venue", match.venue);
    formData.append("competition", match.competition || "");
    formData.append("ticketsAvailable", String(match.ticketsAvailable));
    formData.append("upcoming", String(match.upcoming));
    formData.append("isFeatured", String(match.isFeatured));
    formData.append("isLive", String(match.isLive));

    // Add JSON fields
    formData.append("playersToWatch", JSON.stringify(match.playersToWatch));
    formData.append("matchPreview", JSON.stringify(match.matchPreview));
    formData.append("highlights", JSON.stringify(match.highlights));
    formData.append("tickets", JSON.stringify(match.tickets));
    formData.append("badge", JSON.stringify(match.badge));
    formData.append("backToback", JSON.stringify(match.backToback));

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/match", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.data;

      if (response.status === 201) {
        toast.success("Match added successfully", {
          description:
            "Match has been added successfully you can view it on the matches page",
        });
      }
      return data;
    } catch (error) {
      console.log("Error adding match", error);
      if (error instanceof Error) {
        toast.error("Error adding match", {
          description: error.message,
        });
      }
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMatch((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setMatch((prev) => ({ ...prev, [name]: value }));
  };

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setMatch((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle file uploads
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    team: "home" | "away"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (team === "home") {
        setHomeTeamLogoFile(file);
        setHomeTeamLogoPreview(URL.createObjectURL(file));
        setMatch((prev) => ({
          ...prev,
          homeTeamLogo: URL.createObjectURL(file),
        }));
      } else {
        setAwayTeamLogoFile(file);
        setAwayTeamLogoPreview(URL.createObjectURL(file));
        setMatch((prev) => ({
          ...prev,
          awayTeamLogo: URL.createObjectURL(file),
        }));
      }
    }
  };

  // Handle match preview changes
  const handleMatchPreviewChange = (index: number, value: string) => {
    const updatedPreviews = [...(match.matchPreview || [])];
    updatedPreviews[index] = { ...updatedPreviews[index], label: value };
    setMatch((prev) => ({ ...prev, matchPreview: updatedPreviews }));
  };

  // Add match preview
  const addMatchPreview = () => {
    const newPreview = { id: Date.now(), label: "" };
    setMatch((prev) => ({
      ...prev,
      matchPreview: [...(prev.matchPreview || []), newPreview],
    }));
  };

  // Remove match preview
  const removeMatchPreview = (index: number) => {
    const updatedPreviews = [...(match.matchPreview || [])];
    updatedPreviews.splice(index, 1);
    setMatch((prev) => ({ ...prev, matchPreview: updatedPreviews }));
  };

  // Handle players to watch changes
  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updatedPlayers = [...(match.playersToWatch || [])];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setMatch((prev) => ({ ...prev, playersToWatch: updatedPlayers }));
  };

  // Add player to watch
  const addPlayer = () => {
    const newPlayer = {
      id: Date.now(),
      name: "",
      position: "",
      team: "",
      avatar: "",
    };
    setMatch((prev) => ({
      ...prev,
      playersToWatch: [...(prev.playersToWatch || []), newPlayer],
    }));
  };

  // Remove player to watch
  const removePlayer = (index: number) => {
    const updatedPlayers = [...(match.playersToWatch || [])];
    updatedPlayers.splice(index, 1);
    setMatch((prev) => ({ ...prev, playersToWatch: updatedPlayers }));
  };

  // Handle highlights changes
  const handleHighlightChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedHighlights = [...(match.highlights || [])];
    updatedHighlights[index] = { ...updatedHighlights[index], [field]: value };
    setMatch((prev) => ({ ...prev, highlights: updatedHighlights }));
  };

  // Add highlight
  const addHighlight = () => {
    const newHighlight = {
      id: Date.now(),
      title: "",
      description: "",
      date: "",
      league: "",
    };
    setMatch((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), newHighlight],
    }));
  };

  // Remove highlight
  const removeHighlight = (index: number) => {
    const updatedHighlights = [...(match.highlights || [])];
    updatedHighlights.splice(index, 1);
    setMatch((prev) => ({ ...prev, highlights: updatedHighlights }));
  };

  // Handle badge changes
  const handleBadgeChange = (field: string, value: string) => {
    setMatch((prev) => ({
      ...prev,
      badge: {
        ...(prev.badge || { title: "", color: "red", duration: "" }),
        [field]: value,
      },
    }));
  };

  // Handle ticket changes
  const handleTicketChange = (field: string, value: string | number) => {
    setMatch((prev) => ({
      ...prev,
      tickets: {
        ...(prev.tickets || { price: 0, quantity: 0, sections: [] }),
        [field]:
          typeof value === "string" ? Number.parseInt(value) || 0 : value,
      },
    }));
  };

  // Handle ticket section changes
  const handleTicketSectionChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    if (!match.tickets) return;

    const updatedSections = [...match.tickets.sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]:
        field === "name" ? value : Number.parseInt(value.toString()) || 0,
    };

    setMatch((prev) => ({
      ...prev,
      tickets: {
        ...(prev.tickets || { price: 0, quantity: 0, sections: [] }),
        sections: updatedSections,
      },
    }));
  };

  // Add ticket section
  const addTicketSection = () => {
    if (!match.tickets) return;

    const newSection = { name: "", price: 0, available: 0 };
    setMatch((prev) => ({
      ...prev,
      tickets: {
        ...(prev.tickets || { price: 0, quantity: 0, sections: [] }),
        sections: [...(prev.tickets?.sections || []), newSection],
      },
    }));
  };

  // Remove ticket section
  const removeTicketSection = (index: number) => {
    if (!match.tickets) return;

    const updatedSections = [...match.tickets.sections];
    updatedSections.splice(index, 1);

    setMatch((prev) => ({
      ...prev,
      tickets: {
        ...(prev.tickets || { price: 0, quantity: 0, sections: [] }),
        sections: updatedSections,
      },
    }));
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/matches">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add Match</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="preview">Match Preview</TabsTrigger>
            <TabsTrigger value="players">Players to Watch</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
          </TabsList>

          {/* Match Basic Info*/}
          <AddBasicInfo
            match={match}
            setMatch={setMatch}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleSwitchChange={handleSwitchChange}
            handleFileChange={handleFileChange}
            homeTeamLogoPreview={homeTeamLogoPreview}
            awayTeamLogoPreview={awayTeamLogoPreview}
            handleBadgeChange={handleBadgeChange}
          />

          {/* Match Preview Info  */}
          <AddMatchPreview
            match={match}
            setMatch={setMatch}
            addMatchPreview={addMatchPreview}
            handleMatchPreviewChange={handleMatchPreviewChange}
            removeMatchPreview={removeMatchPreview}
          />

          {/* Players to watch out for  */}
          <AddPlayersToWatchOutFor
            match={match}
            handlePlayerChange={handlePlayerChange}
            removePlayer={removePlayer}
            addPlayer={addPlayer}
          />

          {/* Past Games Highlights  */}
          <AddMatchHighlights
            match={match}
            addHighlight={addHighlight}
            removeHighlight={removeHighlight}
            handleHighlightChange={handleHighlightChange}
          />

          {/* Game tickets  */}
          <AddMatchTickets
            match={match}
            handleTicketChange={handleTicketChange}
            handleTicketSectionChange={handleTicketSectionChange}
            removeTicketSection={removeTicketSection}
            addTicketSection={addTicketSection}
          />
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/matches">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Match"}
          </Button>
        </div>
      </form>
    </div>
  );
}
