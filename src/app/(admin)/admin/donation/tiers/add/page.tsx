import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../prisma";
import TierForm from "@/components/admin/donation/tier-form";

export default async function AddTierPage() {
  await requireAdmin();

  async function createTier(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const minAmount = parseFloat(formData.get("minAmount") as string);
    const benefitsText = formData.get("benefits") as string;
    const isActive = formData.get("isActive") === "on";
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;

    const benefits = benefitsText.split("\n").filter(b => b.trim());

    await prisma.sponsorTier.create({
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
        <h1 className="text-3xl font-bold tracking-tight">Add Sponsor Tier</h1>
        <p className="text-muted-foreground mt-1">
          Add a new sponsorship level
        </p>
      </div>
      <TierForm action={createTier} />
    </div>
  );
}
