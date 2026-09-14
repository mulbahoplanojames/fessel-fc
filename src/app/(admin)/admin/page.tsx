import DashboardBreadcrum from "@/components/admin/dashboard/dashboard-breadcrum";
import QuickActions from "@/components/admin/dashboard/quick-actions";
import RevenueOverview from "@/components/admin/dashboard/revenue-overview";
import StatsCards from "@/components/admin/dashboard/stats-cards";
import { requireAdmin } from "@/lib/session";

export default async function Page() {
  await requireAdmin();

  return (
    <>
      <DashboardBreadcrum />
      <StatsCards />
      <QuickActions />
      <RevenueOverview />
    </>
  );
}
