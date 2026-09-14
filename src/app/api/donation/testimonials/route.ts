import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET() {
  try {
    const testimonials = await prisma.donationTestimonial.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
