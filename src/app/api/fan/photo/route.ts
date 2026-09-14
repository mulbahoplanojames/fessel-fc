import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireUserInRequest } from "@/lib/session";
import { uploadFanImageToCloudinary } from "@/lib/upload-to-cloudinary";

export async function POST(request: NextRequest) {
  const session = await requireUserInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Sign in to upload photos." }, { status: 401 });
  }

  const formData = await request.formData();
  const caption = String(formData.get("caption") || "").trim();
  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Please choose an image to upload." }, { status: 400 });
  }

  const imageUrl = await uploadFanImageToCloudinary(file);

  const photo = await prisma.fanPhoto.create({
    data: {
      authorId: session.user.id,
      authorName: session.user.name || "Fan",
      authorAvatar: session.user.image || null,
      caption,
      image: imageUrl,
      status: "approved",
    },
  });

  return NextResponse.json(
    {
      photo: {
        id: photo.id,
        authorName: photo.authorName,
        authorAvatar: photo.authorAvatar,
        caption: photo.caption,
        image: photo.image,
        createdAt: photo.createdAt.toISOString(),
        likes: 0,
        comments: 0,
        likedByMe: false,
      },
    },
    { status: 201 }
  );
}