import DashboardBreadcrum from "@/components/admin/dashboard/dashboard-breadcrum";
import QuickActions from "@/components/admin/dashboard/quick-actions";
import RevenueOverview from "@/components/admin/dashboard/revenue-overview";
import StatsCards from "@/components/admin/dashboard/stats-cards";
import { auth } from "@/lib/auth";
import prisma from "../../../../prisma";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    throw new Error("User Email not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail!,
    },
  });

  if (!session || user?.role !== "ADMIN") {
    return redirect("/");
  }

  return (
    <>
      <DashboardBreadcrum />
      <StatsCards />
      <QuickActions />
      <RevenueOverview />
    </>
  );
}
