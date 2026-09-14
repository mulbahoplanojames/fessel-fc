import prisma from "../../../../../prisma";
import FanClubAdmin from "@/components/admin/records/fan-club-admin";

export default async function AdminFanClubPage() {
  const members = await prisma.fanClubMember.findMany({
    orderBy: { createdAt: "desc" },
  });
  const active = members.filter((m) => m.status === "active").length;
  const pending = members.filter((m) => m.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fan Club</h1>
          <p className="text-muted-foreground">
            Review and manage fan club memberships.
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-bold">{active}</span>{" "}
            <span className="text-muted-foreground">active</span>
          </div>
          <div>
            <span className="font-bold">{pending}</span>{" "}
            <span className="text-muted-foreground">pending</span>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <FanClubAdmin
          members={members.map((m) => ({
            ...m,
            createdAt: m.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}