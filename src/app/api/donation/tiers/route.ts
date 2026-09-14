import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET() {
  try {
    const tiers = await prisma.sponsorTier.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(tiers);
  } catch (error) {
    console.error("Error fetching sponsor tiers:", error);
    return NextResponse.json(
      { error: "Failed to fetch sponsor tiers" },
      { status: 500 }
    );
  }
}
