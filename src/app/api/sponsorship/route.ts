import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { company, contactName, position, email, phone, tier, message } =
      body;

    if (!company || !contactName || !email || !tier) {
      return NextResponse.json(
        { error: "Company, contact name, email and tier are required." },
        { status: 400 }
      );
    }

    const sponsorship = await prisma.sponsorshipRequest.create({
      data: {
        company: String(company).slice(0, 200),
        contactName: String(contactName).slice(0, 200),
        position: position ? String(position).slice(0, 200) : null,
        email: String(email).slice(0, 200),
        phone: phone ? String(phone).slice(0, 100) : null,
        tier: String(tier),
        message: message ? String(message).slice(0, 1000) : null,
        status: "PENDING",
      },
    });

    return NextResponse.json(sponsorship, { status: 201 });
  } catch (error) {
    console.error("Error creating sponsorship request:", error);
    return NextResponse.json(
      {
        error: "Failed to create sponsorship request",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}