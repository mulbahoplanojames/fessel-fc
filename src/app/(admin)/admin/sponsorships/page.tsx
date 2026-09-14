import { Card, CardContent } from "@/components/ui/card";
import prisma from "../../../../../prisma";
import SponsorshipsAdmin from "@/components/admin/records/sponsorships-admin";

export default async function AdminSponsorshipsPage() {
  const sponsorships = await prisma.sponsorshipRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = sponsorships.map((sponsorship) => ({
    id: sponsorship.id,
    company: sponsorship.company,
    contactName: sponsorship.contactName,
    position: sponsorship.position,
    email: sponsorship.email,
    phone: sponsorship.phone,
    tier: sponsorship.tier,
    message: sponsorship.message,
    status: sponsorship.status,
    createdAt: sponsorship.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sponsorships</h1>
        <p className="text-muted-foreground mt-1">
          Corporate sponsorship requests submitted through the donate page.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <SponsorshipsAdmin sponsorships={serialized} />
        </CardContent>
      </Card>
    </div>
  );
}