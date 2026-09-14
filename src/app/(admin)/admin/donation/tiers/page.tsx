import { requireAdmin } from "@/lib/session";
import prisma from "../../../../../../prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function SponsorTiersPage() {
  await requireAdmin();
  
  const tiers = await prisma.sponsorTier.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sponsor Tiers</h1>
          <p className="text-muted-foreground mt-1">
            Manage sponsorship levels and benefits
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/donation/tiers/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Tier
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiers.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center text-muted-foreground">
              No sponsor tiers found. Add your first tier to get started.
            </CardContent>
          </Card>
        ) : (
          tiers.map((tier) => (
            <Card key={tier.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{tier.name}</CardTitle>
                  {!tier.isActive && (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                  <p className="text-lg font-bold">${tier.minAmount.toLocaleString()}+ LRD</p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/donation/tiers/edit/${tier.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" asChild>
                      <Link href={`/admin/donation/tiers/delete/${tier.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
