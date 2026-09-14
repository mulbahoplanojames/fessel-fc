import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../prisma";
import { uploadMatchImageToCloudinary } from "@/lib/upload-to-cloudinary";
import { requireAdminInRequest } from "@/lib/session";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const match = await prisma.match.findUnique({
      where: { id },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    return NextResponse.json(match, { status: 200 });
  } catch (error) {
    console.error("Error fetching match:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch match",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const formData = await request.formData();

    const existing = await prisma.match.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    const resolveLogo = async (
      entry: FormDataEntryValue | null,
      current: string | null
    ): Promise<string | null> => {
      if (entry instanceof File && entry.size > 0) {
        return uploadMatchImageToCloudinary(entry);
      }
      if (typeof entry === "string" && entry.length > 0) {
        return entry;
      }
      return current;
    };

    const homeTeamLogo = await resolveLogo(
      formData.get("homeTeamLogo"),
      existing.homeTeamLogo
    );
    const awayTeamLogo = await resolveLogo(
      formData.get("awayTeamLogo"),
      existing.awayTeamLogo
    );

    const safeJsonParse = (input: FormDataEntryValue | null) => {
      if (
        input === null ||
        input === "undefined" ||
        input === "" ||
        typeof input !== "string"
      )
        return null;
      try {
        return JSON.parse(input);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        return null;
      }
    };

    const matchData = {
      homeTeam: (formData.get("homeTeam") as string) || existing.homeTeam,
      awayTeam: (formData.get("awayTeam") as string) || existing.awayTeam,
      homeTeamLogo,
      awayTeamLogo,
      date: (formData.get("date") as string) || existing.date,
      time: (formData.get("time") as string) || existing.time,
      venue: (formData.get("venue") as string) || existing.venue,
      competition: (formData.get("competition") as string) || existing.competition,
      ticketsAvailable: formData.get("ticketsAvailable")
        ? formData.get("ticketsAvailable") === "true"
        : (existing.ticketsAvailable ?? false),
      upcoming: formData.get("upcoming")
        ? formData.get("upcoming") === "true"
        : (existing.upcoming ?? false),
      isFeatured: formData.get("isFeatured")
        ? formData.get("isFeatured") === "true"
        : (existing.isFeatured ?? false),
      isLive: formData.get("isLive")
        ? formData.get("isLive") === "true"
        : (existing.isLive ?? false),
    };

    const playersToWatch =
      safeJsonParse(formData.get("playersToWatch")) ?? existing.playersToWatch;
    const matchPreview =
      safeJsonParse(formData.get("matchPreview")) ?? existing.matchPreview;
    const highlights =
      safeJsonParse(formData.get("highlights")) ?? existing.highlights;
    const tickets = safeJsonParse(formData.get("tickets")) ?? existing.tickets;
    const badge = formData.get("badge")
      ? safeJsonParse(formData.get("badge"))
      : existing.badge;
    const backToback = formData.get("backToback")
      ? safeJsonParse(formData.get("backToback"))
      : existing.backToback;

    const updatedPlayersToWatch = await Promise.all(
      (playersToWatch as { name: string; avatar?: File | string }[]).map(
        async (
          player
        ): Promise<{ name: string; avatar?: string }> => {
          if (
            player.avatar &&
            typeof player.avatar !== "string" &&
            player.avatar.size > 0
          ) {
            const avatarUrl = await uploadMatchImageToCloudinary(
              player.avatar as File
            );
            return { ...player, avatar: avatarUrl };
          }
          return {
            name: player.name,
            ...(typeof player.avatar === "string"
              ? { avatar: player.avatar }
              : {}),
          };
        }
      )
    );

    const match = await prisma.match.update({
      where: { id },
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

    revalidatePath("/admin/matches");
    return NextResponse.json(match, { status: 200 });
  } catch (error) {
    console.error("Error updating match:", error);
    return NextResponse.json(
      {
        error: "Failed to update match",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    // console.log("Match Id", id);

    const deletedMatch = await prisma.match.delete({
      where: {
        id,
      },
    });

    console.log("Deleted match:", deletedMatch);
    revalidatePath("/admin/matches");
    return NextResponse.json(deletedMatch, { status: 200 });
  } catch (error) {
    console.error("Error deleting match:", error);
    return NextResponse.json(
      {
        error: "Failed to delete match",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}
