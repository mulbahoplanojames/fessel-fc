import { Card, CardContent } from "@/components/ui/card";
import prisma from "../../../../../prisma";
import DonationsAdmin from "@/components/admin/records/donations-admin";

export default async function AdminDonationsPage() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = donations.map((donation) => ({
    id: donation.id,
    donationType: donation.donationType,
    amount: donation.amount,
    currency: donation.currency,
    paymentMethod: donation.paymentMethod,
    firstName: donation.firstName,
    lastName: donation.lastName,
    email: donation.email,
    phone: donation.phone,
    message: donation.message,
    anonymous: donation.anonymous,
    status: donation.status,
    createdAt: donation.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
        <p className="text-muted-foreground mt-1">
          Donations submitted through the donate page.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <DonationsAdmin donations={serialized} />
        </CardContent>
      </Card>
    </div>
  );
}