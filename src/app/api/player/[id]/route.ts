import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../prisma";
import { uploadPlayersImageToCloudinary } from "@/lib/upload-to-cloudinary";
import { requireAdminInRequest } from "@/lib/session";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const player = await prisma.player.findUnique({
      where: { id },
    });

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json(player, { status: 200 });
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch player",
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

    const existing = await prisma.player.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const playerImage = formData.get("image");
    let image = existing.image;
    if (playerImage instanceof File && playerImage.size > 0) {
      image = await uploadPlayersImageToCloudinary(playerImage);
    }

    const playerData = {
      name: (formData.get("name") as string) || existing.name,
      position: (formData.get("position") as string) || existing.position,
      number: formData.get("number")
        ? Number(formData.get("number"))
        : existing.number,
      featured: formData.get("featured")
        ? formData.get("featured") === "true"
        : (existing.featured ?? false),
      image,
      stats: formData.get("stats")
        ? JSON.parse(formData.get("stats") as string)
        : existing.stats,
      playerbio: formData.get("playerbio")
        ? JSON.parse(formData.get("playerbio") as string)
        : existing.playerbio,
    };

    const player = await prisma.player.update({
      where: { id },
      data: playerData,
    });

    revalidatePath("/admin/players");
    return NextResponse.json(player, { status: 200 });
  } catch (error) {
    console.error("Error updating player:", error);
    return NextResponse.json(
      {
        error: "Failed to update player",
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
    // console.log("Player Id", id);

    const deletedPlayer = await prisma.player.delete({
      where: {
        id,
      },
    });

    console.log("Deleted player:", deletedPlayer);
    revalidatePath("/admin/players");
    return NextResponse.json(deletedPlayer, { status: 200 });
  } catch (error) {
    console.error("Error deleting player:", error);
    return NextResponse.json(
      {
        error: "Failed to delete player",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}
