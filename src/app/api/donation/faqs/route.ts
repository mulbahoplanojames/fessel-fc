import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET() {
  try {
    const faqs = await prisma.donationFAQ.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}
