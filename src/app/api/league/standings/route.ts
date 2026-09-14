import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET() {
  try {
    const standings = await prisma.leagueStanding.findMany({
      where: { isActive: true },
      orderBy: { position: "asc" },
    });

    return NextResponse.json(standings);
  } catch (error) {
    console.error("Error fetching league standings:", error);
    return NextResponse.json(
      { error: "Failed to fetch league standings" },
      { status: 500 }
    );
  }
}
