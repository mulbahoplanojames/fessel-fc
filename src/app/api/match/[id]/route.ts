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
