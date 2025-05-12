import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
