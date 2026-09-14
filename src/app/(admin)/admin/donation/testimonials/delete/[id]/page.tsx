import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../../../../prisma";
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

export default async function DeleteTestimonialPage({
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

  async function deleteTestimonial() {
    "use server";
    await prisma.donationTestimonial.delete({
      where: { id },
    });
    redirect("/admin/donation/testimonials");
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/donation/testimonials">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Testimonials
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Testimonial
          </CardTitle>
          <CardDescription>
            Are you sure you want to delete the testimonial from &ldquo;{testimonial.name}&rdquo;? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted">
              <h3 className="font-medium mb-2">Testimonial Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {testimonial.name}</p>
                <p><span className="font-medium">Role:</span> {testimonial.role}</p>
                <p><span className="font-medium">Content:</span> {testimonial.content}</p>
              </div>
            </div>

            <form action={deleteTestimonial}>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href="/admin/donation/testimonials">Cancel</Link>
                </Button>
                <Button type="submit" variant="destructive">
                  Delete Testimonial
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
