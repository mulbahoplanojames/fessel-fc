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

    const deletedPlayer = await prisma.news.delete({
      where: {
        id,
      },
    });

    console.log("Deleted news:", deletedPlayer);
    revalidatePath("/admin/news");
    return NextResponse.json(deletedPlayer, { status: 200 });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      {
        error: "Failed to delete news",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}
