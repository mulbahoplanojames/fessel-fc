import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import prisma from "../../../../../../../../prisma";

export default async function DeleteTierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const tier = await prisma.sponsorTier.findUnique({
    where: { id },
  });

  if (!tier) {
    notFound();
  }

  async function deleteTier() {
    "use server";
    await prisma.sponsorTier.delete({
      where: { id },
    });
    redirect("/admin/donation/tiers");
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/donation/tiers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tiers
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Sponsor Tier
          </CardTitle>
          <CardDescription>
            Are you sure you want to delete the &ldquo;{tier.name}&rdquo; tier? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted">
              <h3 className="font-medium mb-2">Tier Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {tier.name}</p>
                <p><span className="font-medium">Description:</span> {tier.description}</p>
                <p><span className="font-medium">Minimum Amount:</span> ${tier.minAmount.toLocaleString()} LRD</p>
              </div>
            </div>

            <form action={deleteTier}>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href="/admin/donation/tiers">Cancel</Link>
                </Button>
                <Button type="submit" variant="destructive">
                  Delete Tier
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
