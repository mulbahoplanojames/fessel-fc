import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireUserInRequest } from "@/lib/session";
import { uploadFanImageToCloudinary } from "@/lib/upload-to-cloudinary";

export async function POST(request: NextRequest) {
  const session = await requireUserInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Sign in to post in the fan zone." }, { status: 401 });
  }

  const formData = await request.formData();
  const content = String(formData.get("content") || "").trim();

  if (!content) {
    return NextResponse.json({ error: "Post content is required." }, { status: 400 });
  }

  let image: string | undefined;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    image = await uploadFanImageToCloudinary(file);
  }

  const existingMember = await prisma.fanClubMember.findFirst({
    where: {
      OR: [{ userId: session.user.id }, { email: session.user.email?.toLowerCase() }],
      status: "active",
    },
  });

  const post = await prisma.fanPost.create({
    data: {
      authorId: session.user.id,
      authorName: session.user.name || "Fan",
      authorAvatar: session.user.image || null,
      content,
      image: image || null,
      status: "approved",
    },
  });

  const [likes, comments] = await Promise.all([
    prisma.fanPostLike.count({ where: { postId: post.id } }),
    prisma.fanPostComment.count({ where: { postId: post.id } }),
  ]);

  return NextResponse.json(
    {
      post: {
        id: post.id,
        authorName: post.authorName,
        authorAvatar: post.authorAvatar,
        content: post.content,
        image: post.image,
        createdAt: post.createdAt.toISOString(),
        likes,
        comments,
        likedByMe: false,
      },
      member: !!existingMember,
    },
    { status: 201 }
  );
}