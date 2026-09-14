import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireAdminInRequest } from "@/lib/session";

export async function PATCH(request: NextRequest) {
  const session = await requireAdminInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await request.json();
  if (!id || !["subscribed", "unsubscribed"].includes(status)) {
    return NextResponse.json({ error: "id and a valid status are required." }, { status: 400 });
  }
  const updated = await prisma.newsletterSubscriber.update({
    where: { id: String(id) },
    data: { status },
  });
  return NextResponse.json({ id: updated.id, status: updated.status });
}

export async function DELETE(request: NextRequest) {
  const session = await requireAdminInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }
  await prisma.newsletterSubscriber.delete({ where: { id: String(id) } });
  return NextResponse.json({ success: true });
}