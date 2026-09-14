import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../../../../prisma";
import TestimonialForm from "@/components/admin/donation/testimonial-form";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const testimonial = await prisma.donationTestimonial.findUnique({
    where: { id },
  });

  if (!testimonial) {
    notFound();
  }

  async function updateTestimonial(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const image = formData.get("image") as string;
    const content = formData.get("content") as string;
    const isCorporate = formData.get("isCorporate") === "on";
    const isActive = formData.get("isActive") === "on";
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;

    await prisma.donationTestimonial.update({
      where: { id },
      data: {
        name,
        role,
        image: image || null,
        content,
        isCorporate,
        isActive,
        displayOrder,
      },
    });

    redirect("/admin/donation/testimonials");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
        <p className="text-muted-foreground mt-1">
          Update testimonial details
        </p>
      </div>
      <TestimonialForm
        action={updateTestimonial}
        initialData={{
          name: testimonial.name,
          role: testimonial.role,
          image: testimonial.image || undefined,
          content: testimonial.content,
          isCorporate: testimonial.isCorporate,
          isActive: testimonial.isActive,
          displayOrder: testimonial.displayOrder,
        }}
      />
    </div>
  );
}
