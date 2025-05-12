import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { uploadMatchImageToCloudinary } from "@/lib/upload-to-cloudinary";

type Player = {
  name: string;
  position?: string;
  team?: string;
  avatar?: File | string;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const homeTeamLogo = formData.get("homeTeamLogo") as File;
    const awayTeamLogo = formData.get("awayTeamLogo") as File;
    // const playerAvatars = formData.getAll("playerAvatars") as File[];

    // Upload team logos to Cloudinary
    const homeTeamLogoUrl = homeTeamLogo
      ? await uploadMatchImageToCloudinary(homeTeamLogo)
      : "";
    const awayTeamLogoUrl = awayTeamLogo
      ? await uploadMatchImageToCloudinary(awayTeamLogo)
      : "";

    const matchData = {
      homeTeam: formData.get("homeTeam") as string,
      awayTeam: formData.get("awayTeam") as string,
      homeTeamLogo: homeTeamLogoUrl,
      awayTeamLogo: awayTeamLogoUrl,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      venue: formData.get("venue") as string,
      competition: formData.get("competition") as string,
      ticketsAvailable: formData.get("ticketsAvailable") === "true",
      upcoming: formData.get("upcoming") === "true",
      isFeatured: formData.get("isFeatured") === "true",
      isLive: formData.get("isLive") === "true",
    };

    // Helper to safely parse JSON fields
    const safeJsonParse = (input: FormDataEntryValue | null) => {
      if (input === null || input === "undefined") return null;
      try {
        return JSON.parse(input as string);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        console.error("Invalid JSON:", input);
        return null;
      }
    };

    const playersToWatch = safeJsonParse(formData.get("playersToWatch")) || [];
    const matchPreview = safeJsonParse(formData.get("matchPreview")) || [];
    const highlights = safeJsonParse(formData.get("highlights")) || [];
    const tickets = safeJsonParse(formData.get("tickets")) || {};
    const badge = safeJsonParse(formData.get("badge")); // can be null
    const backToback = safeJsonParse(formData.get("backToback")) || {};

    // Upload player avatars to Cloudinary
    // const updatedPlayersToWatch = await Promise.all(
    //   playersToWatch.map(async (player: Player, index: number) => {
    //     const avatarFile = playerAvatars[index];
    //     console.log("Avatar file:", avatarFile);
    //     if (avatarFile) {
    //       const avatarUrl = await uploadMatchImageToCloudinary(avatarFile);
    //       return { ...player, avatar: avatarUrl };
    //     }
    //     return player;
    //   })
    // );

    // const updatedPlayersToWatch = await Promise.all(
    //   playersToWatch.map(async (player: Player) => {
    //     if (player.avatar) {
    //       const avatarFile = player.avatar;
    //       const avatarUrl = await uploadMatchImageToCloudinary(avatarFile);
    //       return { ...player, avatar: avatarUrl };
    //     }
    //     return player;
    //   })
    // );

    const updatedPlayersToWatch = await Promise.all(
      playersToWatch.map(async (player: Player) => {
        if (player.avatar && typeof player.avatar !== "string") {
          const avatarUrl = await uploadMatchImageToCloudinary(player.avatar);
          return { ...player, avatar: avatarUrl };
        }
        return player;
      })
    );

    const match = await prisma.match.create({
      data: {
        ...matchData,
        playersToWatch: updatedPlayersToWatch,
        matchPreview,
        highlights,
        tickets,
        badge,
        backToback,
      },
    });

    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    console.error("Error creating match:", error);
    return NextResponse.json(
      {
        error: "Failed to add match",
        details: (error as Error).message,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await prisma.$connect();
    const matches = await prisma.match.findMany();
    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch matches",
        details: (error as Error).message,
      },
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
