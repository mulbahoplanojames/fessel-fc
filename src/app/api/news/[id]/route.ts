import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../prisma";
import { requireAdminInRequest } from "@/lib/session";

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
