import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireAdminInRequest } from "@/lib/session";

const STATUSES = ["approved", "pending", "rejected"];

export async function PATCH(request: NextRequest) {
  const session = await requireAdminInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { kind, id, status } = await request.json();
  if ((kind !== "fanpost" && kind !== "fanphoto") || !id) {
    return NextResponse.json({ error: "kind and id are required." }, { status: 400 });
  }
  if (status && !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  if (kind === "fanpost") {
    const updated = await prisma.fanPost.update({
      where: { id: String(id) },
      data: { status: status ? String(status) : undefined },
    });
    return NextResponse.json({ id: updated.id, status: updated.status });
  }

  const updated = await prisma.fanPhoto.update({
    where: { id: String(id) },
    data: { status: status ? String(status) : undefined },
  });
  return NextResponse.json({ id: updated.id, status: updated.status });
}

export async function DELETE(request: NextRequest) {
  const session = await requireAdminInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { kind, id } = await request.json();
  if ((kind !== "fanpost" && kind !== "fanphoto") || !id) {
    return NextResponse.json({ error: "kind and id are required." }, { status: 400 });
  }

  if (kind === "fanpost") {
    await prisma.fanPost.delete({ where: { id: String(id) } });
  } else {
    await prisma.fanPhoto.delete({ where: { id: String(id) } });
  }

  return NextResponse.json({ success: true });
}