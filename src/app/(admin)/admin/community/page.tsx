import prisma from "../../../../../prisma";
import CommunityAdmin from "@/components/admin/records/community-admin";

export default async function AdminCommunityPage() {
  const [posts, photos] = await Promise.all([
    prisma.fanPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { likes: true, comments: true } } },
    }),
    prisma.fanPhoto.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { likes: true, comments: true } } },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">
          Moderate fan zone posts and photos.
        </p>
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Community content awaiting moderation
            </div>
          </div>
        </div>
        <div className="p-6">
          <CommunityAdmin
            posts={posts.map((p) => ({
              ...p,
              createdAt: p.createdAt.toISOString(),
              likes: p._count.likes,
              comments: p._count.comments,
            }))}
            photos={photos.map((p) => ({
              ...p,
              createdAt: p.createdAt.toISOString(),
              likes: p._count.likes,
              comments: p._count.comments,
            }))}
          />
        </div>
      </div>
    </div>
  );
}