import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import TierForm from "@/components/admin/donation/tier-form";
import { notFound } from "next/navigation";
import prisma from "../../../../../../../../prisma";

export default async function EditTierPage({
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

  async function updateTier(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const minAmount = parseFloat(formData.get("minAmount") as string);
    const benefitsText = formData.get("benefits") as string;
    const isActive = formData.get("isActive") === "on";
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;

    const benefits = benefitsText.split("\n").filter(b => b.trim());

    await prisma.sponsorTier.update({
      where: { id },
      data: {
        name,
        description,
        minAmount,
        benefits,
        isActive,
        displayOrder,
      },
    });

    redirect("/admin/donation/tiers");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Sponsor Tier</h1>
        <p className="text-muted-foreground mt-1">
          Update sponsorship tier details
        </p>
      </div>
      <TierForm
        action={updateTier}
        initialData={{
          name: tier.name,
          description: tier.description,
          minAmount: tier.minAmount,
          benefits: Array.isArray(tier.benefits) ? tier.benefits : [],
          isActive: tier.isActive,
          displayOrder: tier.displayOrder,
        }}
      />
    </div>
  );
}
