import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import FAQForm from "@/components/admin/donation/faq-form";
import prisma from "../../../../../../../prisma";

export default async function AddFAQPage() {
  await requireAdmin();

  async function createFAQ(formData: FormData) {
    "use server";
    
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const isActive = formData.get("isActive") === "on";
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;

    await prisma.donationFAQ.create({
      data: {
        question,
        answer,
        isActive,
        displayOrder,
      },
    });

    redirect("/admin/donation/faqs");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add FAQ</h1>
        <p className="text-muted-foreground mt-1">
          Add a new frequently asked question to the donation page
        </p>
      </div>
      <FAQForm action={createFAQ} />
    </div>
  );
}
