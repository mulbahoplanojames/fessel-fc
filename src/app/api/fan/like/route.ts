import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireUserInRequest } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await requireUserInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Sign in to like content." }, { status: 401 });
  }

  const { kind, id } = await request.json();
  if ((kind !== "post" && kind !== "photo") || !id) {
    return NextResponse.json({ error: "kind (post|photo) and id are required." }, { status: 400 });
  }

  let exists = false;
  let likes = 0;

  if (kind === "post") {
    const like = await prisma.fanPostLike.findUnique({
      where: { postId_userId: { postId: id, userId: session.user.id } },
    });
    exists = !!like;
    if (like) {
      await prisma.fanPostLike.delete({ where: { id: like.id } });
    } else {
      await prisma.fanPostLike.create({ data: { postId: id, userId: session.user.id } });
    }
    likes = await prisma.fanPostLike.count({ where: { postId: id } });
  } else {
    const like = await prisma.fanPhotoLike.findUnique({
      where: { photoId_userId: { photoId: id, userId: session.user.id } },
    });
    exists = !!like;
    if (like) {
      await prisma.fanPhotoLike.delete({ where: { id: like.id } });
    } else {
      await prisma.fanPhotoLike.create({ data: { photoId: id, userId: session.user.id } });
    }
    likes = await prisma.fanPhotoLike.count({ where: { photoId: id } });
  }

  return NextResponse.json({ liked: !exists, likes });
}