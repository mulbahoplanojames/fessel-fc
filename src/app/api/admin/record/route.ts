import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireAdminInRequest } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { kind, id, status, response } = body;

    if (!kind || !id) {
      return NextResponse.json(
        { error: "kind and id are required." },
        { status: 400 }
      );
    }

    let updated;
    switch (kind) {
      case "ticket":
        updated = await prisma.supportTicket.update({
          where: { id: String(id) },
          data: {
            status: status ? String(status) : undefined,
            response: response !== undefined ? String(response) : undefined,
            respondedAt:
              response !== undefined ? new Date() : undefined,
          },
        });
        break;
      case "donation":
        updated = await prisma.donation.update({
          where: { id: String(id) },
          data: { status: status ? String(status) : undefined },
        });
        break;
      case "sponsorship":
        updated = await prisma.sponsorshipRequest.update({
          where: { id: String(id) },
          data: { status: status ? String(status) : undefined },
        });
        break;
      case "order":
        updated = await prisma.order.update({
          where: { id: String(id) },
          data: { status: status ? String(status) : undefined },
        });
        break;
      default:
        return NextResponse.json(
          { error: "Unsupported record kind." },
          { status: 400 }
        );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      {
        error: "Failed to update record",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}