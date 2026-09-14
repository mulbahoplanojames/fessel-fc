import { Card, CardContent } from "@/components/ui/card";
import prisma from "../../../../../prisma";
import UserRoleAdmin from "@/components/admin/users/user-role-admin";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      accounts: { select: { providerId: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const session = await import("@/lib/session").then((m) => m.getSession());

  const serialized = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
    createdAt: user.createdAt.toISOString(),
    providers: user.accounts.map((account) => account.providerId),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground mt-1">
          Manage user accounts and roles.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <UserRoleAdmin
            users={serialized}
            currentUserId={session?.user.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}