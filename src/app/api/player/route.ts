import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { uploadPlayersImageToCloudinary } from "@/lib/upload-to-cloudinary";
import { requireAdminInRequest } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    // Handle player image upload
    const playerImage = formData.get("image") as File;
    const imagePath = await uploadPlayersImageToCloudinary(playerImage);

    // console.log("Received data:", formData); // Debug log

    // Parse other form data
    const playerData = {
      name: formData.get("name") as string,
      position: formData.get("position") as string,
      number: Number(formData.get("number")),
      featured: formData.get("featured") === "true",
      image: imagePath,
      stats: JSON.parse(formData.get("stats") as string),
      playerbio: JSON.parse(formData.get("playerbio") as string),
    };

    const player = await prisma.player.create({
      data: playerData,
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error("Error creating player:", error); // Debug log
    return NextResponse.json(
      {
        error: "Failed to add player",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const players = await prisma.player.findMany();
    // console.log("Players:", players);
    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    console.error("Error fetching player:", error); // Debug log
    return NextResponse.json(
      {
        error: "Failed to fetch player",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}
