import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireUserInRequest } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await requireUserInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Sign in to comment." }, { status: 401 });
  }

  const { kind, id, content } = await request.json();
  const trimmed = String(content || "").trim();
  if ((kind !== "post" && kind !== "photo") || !id || !trimmed) {
    return NextResponse.json({ error: "kind (post|photo), id and content are required." }, { status: 400 });
  }

  const authorName = session.user.name || "Fan";

  let comments = 0;
  if (kind === "post") {
    const post = await prisma.fanPost.findUnique({ where: { id } });
    if (!post || post.status !== "approved") {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    await prisma.fanPostComment.create({
      data: {
        postId: id,
        authorId: session.user.id,
        authorName,
        content: trimmed,
      },
    });
    comments = await prisma.fanPostComment.count({ where: { postId: id } });
  } else {
    const photo = await prisma.fanPhoto.findUnique({ where: { id } });
    if (!photo || photo.status !== "approved") {
      return NextResponse.json({ error: "Photo not found." }, { status: 404 });
    }
    await prisma.fanPhotoComment.create({
      data: {
        photoId: id,
        authorId: session.user.id,
        authorName,
        content: trimmed,
      },
    });
    comments = await prisma.fanPhotoComment.count({ where: { photoId: id } });
  }

  return NextResponse.json({ comments, author: { name: authorName, avatar: session.user.image } });
}