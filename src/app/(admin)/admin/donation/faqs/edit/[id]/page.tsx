import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../../../../prisma";
import FAQForm from "@/components/admin/donation/faq-form";
import { notFound } from "next/navigation";

export default async function EditFAQPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const faq = await prisma.donationFAQ.findUnique({
    where: { id },
  });

  if (!faq) {
    notFound();
  }

  async function updateFAQ(formData: FormData) {
    "use server";
    
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const isActive = formData.get("isActive") === "on";
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;

    await prisma.donationFAQ.update({
      where: { id },
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
        <h1 className="text-3xl font-bold tracking-tight">Edit FAQ</h1>
        <p className="text-muted-foreground mt-1">
          Update FAQ details
        </p>
      </div>
      <FAQForm
        action={updateFAQ}
        initialData={{
          question: faq.question,
          answer: faq.answer,
          isActive: faq.isActive,
          displayOrder: faq.displayOrder,
        }}
      />
    </div>
  );
}
