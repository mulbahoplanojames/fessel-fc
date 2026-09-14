import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import TestimonialForm from "@/components/admin/donation/testimonial-form";
import prisma from "../../../../../../../prisma";

export default async function AddTestimonialPage() {
  await requireAdmin();

  async function createTestimonial(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const image = formData.get("image") as string;
    const content = formData.get("content") as string;
    const isCorporate = formData.get("isCorporate") === "on";
    const isActive = formData.get("isActive") === "on";
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;

    await prisma.donationTestimonial.create({
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
        <h1 className="text-3xl font-bold tracking-tight">Add Testimonial</h1>
        <p className="text-muted-foreground mt-1">
          Add a new donor testimonial to display on the donation page
        </p>
      </div>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
