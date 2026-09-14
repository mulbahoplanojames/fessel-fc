import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { requireAdminInRequest } from "@/lib/session";

const SPONSORSHIP_TIER_AMOUNTS: Record<string, number> = {
  bronze: 500000,
  silver: 1000000,
  gold: 2500000,
  platinum: 5000000,
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type MonthBuckets = { label: string; value: number }[];

const emptyMonths = (): MonthBuckets =>
  MONTH_LABELS.map((label) => ({ label, value: 0 }));

const bucketByMonth = (
  records: { createdAt: Date | string; amount?: number }[]
) => {
  const buckets = emptyMonths();
  for (const record of records) {
    const date = new Date(record.createdAt);
    const idx = date.getMonth();
    buckets[idx].value += record.amount ?? 0;
  }
  return buckets;
};

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const currentMonth = now.getMonth();

    const orders = await prisma.order.findMany();
    const donations = await prisma.donation.findMany({
      where: { status: { not: "PENDING" } },
    });
    const sponsorships = await prisma.sponsorshipRequest.findMany({
      where: { status: "APPROVED" },
    });
    const openTickets = await prisma.supportTicket.count({
      where: { status: "OPEN" },
    });

    const validOrders = orders.filter((o) => o.status !== "CANCELLED");
    const shopByMonth = bucketByMonth(
      validOrders.map((o) => ({ createdAt: o.createdAt, amount: o.total }))
    );
    const shopRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);

    const donationByMonth = bucketByMonth(
      donations.map((d) => ({ createdAt: d.createdAt, amount: d.amount }))
    );
    const donationTotal = donations.reduce((sum, d) => sum + d.amount, 0);

    const sponsorshipByMonth = bucketByMonth(
      sponsorships.map((s) => ({
        createdAt: s.createdAt,
        amount: SPONSORSHIP_TIER_AMOUNTS[s.tier] ?? 0,
      }))
    );
    const sponsorshipTotal = sponsorships.reduce(
      (sum, s) => sum + (SPONSORSHIP_TIER_AMOUNTS[s.tier] ?? 0),
      0
    );

    return NextResponse.json(
      {
        month: MONTH_LABELS[currentMonth],
        shopRevenue,
        shopByMonth,
        donations: donationTotal,
        donationByMonth,
        sponsorships: sponsorshipTotal,
        sponsorshipByMonth,
        openTickets,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error building revenue report:", error);
    return NextResponse.json(
      {
        error: "Failed to build revenue report",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}