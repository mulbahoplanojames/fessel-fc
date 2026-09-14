import { NextRequest, NextResponse } from "next/server";
import { requireUserInRequest } from "@/lib/session";
import prisma from "../../../../prisma";

const SUPPORT_CATEGORIES = [
  "Feedback / Suggestion",
  "Tickets & Booking",
  "Shop & Orders",
  "Donations",
  "Membership / Fan Zone",
  "Website & Account",
  "Other",
];

export async function POST(request: NextRequest) {
  const session = await requireUserInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { subject, category, message } = (body ?? {}) as {
    subject?: unknown;
    category?: unknown;
    message?: unknown;
  };

  if (
    typeof subject !== "string" ||
    subject.trim().length < 3 ||
    subject.trim().length > 120
  ) {
    return NextResponse.json(
      { error: "Subject must be between 3 and 120 characters." },
      { status: 400 }
    );
  }

  if (
    typeof category !== "string" ||
    !SUPPORT_CATEGORIES.includes(category)
  ) {
    return NextResponse.json(
      { error: "Please choose a valid support category." },
      { status: 400 }
    );
  }

  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Describe your issue in at least 10 characters." },
      { status: 400 }
    );
  }

  try {
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: session.user.id,
        subject: subject.trim(),
        category,
        message: message.trim(),
        status: "OPEN",
      },
    });

    return NextResponse.json(
      { ticketId: ticket.id, status: "OPEN" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return NextResponse.json(
      { error: "Failed to submit your request. Please try again later." },
      { status: 500 }
    );
  }
}