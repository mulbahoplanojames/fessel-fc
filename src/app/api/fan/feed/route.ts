import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireUserInRequest } from "@/lib/session";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") || "all";
  const session = await requireUserInRequest(request);
  const userId = session?.user.id;

  const [posts, photos, activeMembers] = await Promise.all([
    type === "photos"
      ? Promise.resolve([])
      : prisma.fanPost.findMany({
          where: { status: "approved" },
          orderBy: { createdAt: "desc" },
          take: 50,
          include: {
            _count: { select: { comments: true, likes: true } },
          },
        }),
    type === "posts"
      ? Promise.resolve([])
      : prisma.fanPhoto.findMany({
          where: { status: "approved" },
          orderBy: { createdAt: "desc" },
          take: 50,
          include: {
            _count: { select: { comments: true, likes: true } },
          },
        }),
    prisma.fanClubMember.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const likedPostIds = userId
    ? new Set(
        (
          await prisma.fanPostLike.findMany({
            where: { userId },
            select: { postId: true },
          })
        ).map((like) => like.postId)
      )
    : new Set<string>();

  const likedPhotoIds = userId
    ? new Set(
        (
          await prisma.fanPhotoLike.findMany({
            where: { userId },
            select: { photoId: true },
          })
        ).map((like) => like.photoId)
      )
    : new Set<string>();

  const member = userId
    ? await prisma.fanClubMember.findFirst({
        where: { userId, status: "active" },
      })
    : null;

  return NextResponse.json({
    posts: posts.map((post) => ({
      id: post.id,
      authorName: post.authorName,
      authorAvatar: post.authorAvatar,
      content: post.content,
      image: post.image,
      createdAt: post.createdAt.toISOString(),
      likes: post._count.likes,
      comments: post._count.comments,
      likedByMe: likedPostIds.has(post.id),
    })),
    photos: photos.map((photo) => ({
      id: photo.id,
      authorName: photo.authorName,
      authorAvatar: photo.authorAvatar,
      caption: photo.caption,
      image: photo.image,
      createdAt: photo.createdAt.toISOString(),
      likes: photo._count.likes,
      comments: photo._count.comments,
      likedByMe: likedPhotoIds.has(photo.id),
    })),
    clientMember: !!member,
    members: activeMembers.map((m) => ({
      id: m.id,
      firstName: m.firstName,
      lastName: m.lastName,
      membershipType: m.membershipType,
    })),
  });
}