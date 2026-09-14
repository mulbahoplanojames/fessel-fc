import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireAdminInRequest } from "@/lib/session";

const ROLES = ["USER", "ADMIN", "PLAYER"] as const;

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, role } = body;

    if (!userId || !role || !ROLES.includes(role)) {
      return NextResponse.json(
        { error: "A valid userId and role are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: String(userId) },
      data: { role },
    });

    return NextResponse.json(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      {
        error: "Failed to update user role",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}